"use client";

import { useEffect, useMemo, useRef } from "react";

/**
 * LiquidDistortionBackdrop
 * -----------------------
 * A "distortion window" layer meant to sit inside a fixed header.
 *
 * Key idea:
 * - We snapshot the *page behind the header* into a texture (throttled on scroll/resize).
 * - A lightweight WebGL fragment shader displaces that texture with animated noise.
 * - Header UI (logo/nav) is rendered ABOVE this layer and remains perfectly sharp.
 *
 * Notes:
 * - This is performance-conscious: we capture only the header-height strip and at a
 *   reduced scale; animation is GPU-side (no layout thrash).
 * - For prefers-reduced-motion, the shader stops animating (static refraction).
 */
export default function LiquidDistortionBackdrop({
  /**
   * A selector for the fixed header element, used so html2canvas can ignore it
   * while capturing the underlying page.
   */
  headerSelector = '[data-liquid-header="true"]',
  className,
  style,
}) {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const texRef = useRef(null);
  const rafRef = useRef(null);
  const captureRafRef = useRef(null);
  const lastCaptureAtRef = useRef(0);
  const reducedMotionRef = useRef(false);

  // Stable IDs for shader compilation debugging / safety.
  const shaderSource = useMemo(() => {
    // Vertex: full-screen quad.
    const vs = `
      attribute vec2 aPos;
      varying vec2 vUv;
      void main() {
        vUv = (aPos + 1.0) * 0.5;
        gl_Position = vec4(aPos, 0.0, 1.0);
      }
    `;

    /**
     * Fragment shader:
     * - Noise-driven displacement (both X and Y)
     * - Very slow ambient flow (uTime)
     * - "Intensify where content is": we approximate local edge/detail in the texture
     *   by sampling neighboring pixels; more edges = stronger refraction.
     */
    const fs = `
      precision mediump float;
      varying vec2 vUv;
      uniform sampler2D uTex;
      uniform vec2 uTexel;      // 1.0 / textureSize
      uniform float uTime;      // seconds
      uniform float uAmpBase;   // base displacement
      uniform float uAmpDetail; // additional displacement on edges
      uniform float uFlow;      // flow speed

      // Hash + value noise (cheap, WebGL1-friendly).
      float hash21(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash21(i);
        float b = hash21(i + vec2(1.0, 0.0));
        float c = hash21(i + vec2(0.0, 1.0));
        float d = hash21(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
        for (int i = 0; i < 5; i++) {
          v += a * noise(p);
          p = m * p;
          a *= 0.5;
        }
        return v;
      }

      float luma(vec3 c) {
        return dot(c, vec3(0.299, 0.587, 0.114));
      }

      void main() {
        vec2 uv = vUv;

        // Edge/detail detection (stronger refraction when text/imagery is behind).
        vec3 c0 = texture2D(uTex, uv).rgb;
        float y0 = luma(c0);
        float yx = luma(texture2D(uTex, uv + vec2(uTexel.x, 0.0)).rgb);
        float yy = luma(texture2D(uTex, uv + vec2(0.0, uTexel.y)).rgb);
        float edge = abs(y0 - yx) + abs(y0 - yy);
        float detail = clamp(edge * 8.0, 0.0, 1.0);

        // Slow, organic flow field.
        float t = uTime * uFlow;
        vec2 p = uv * vec2(3.0, 1.8);
        float n1 = fbm(p + vec2(t * 0.10, -t * 0.06));
        float n2 = fbm(p * 1.7 + vec2(-t * 0.07, t * 0.09));

        // Two-channel displacement (horizontal + vertical warping).
        vec2 disp = vec2(n1 - 0.5, n2 - 0.5);

        // Stronger warping on edges (where distortion is "visible").
        float amp = uAmpBase + detail * uAmpDetail;
        vec2 duv = uv + disp * amp;

        // Mild chromatic separation for premium "refraction" feel (subtle).
        vec2 chroma = disp * (amp * 0.25);
        float r = texture2D(uTex, duv + chroma).r;
        float g = texture2D(uTex, duv).g;
        float b = texture2D(uTex, duv - chroma).b;
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `;

    return { vs, fs };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedMotionRef.current = Boolean(prefersReduced);

    // Init WebGL.
    const gl =
      canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: true }) ||
      canvas.getContext("experimental-webgl");
    if (!gl) return; // graceful fallback (tint/grain still render)

    glRef.current = gl;

    const compile = (type, source) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, source);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        // eslint-disable-next-line no-console
        console.warn("Liquid header shader compile error:", gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, shaderSource.vs);
    const fs = compile(gl.FRAGMENT_SHADER, shaderSource.fs);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      // eslint-disable-next-line no-console
      console.warn("Liquid header shader link error:", gl.getProgramInfoLog(program));
      return;
    }
    programRef.current = program;

    // Fullscreen quad.
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Texture for the captured backdrop.
    const tex = gl.createTexture();
    texRef.current = tex;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // Initialize with a 1x1 transparent pixel.
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0]),
    );

    const uTex = gl.getUniformLocation(program, "uTex");
    const uTexel = gl.getUniformLocation(program, "uTexel");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uAmpBase = gl.getUniformLocation(program, "uAmpBase");
    const uAmpDetail = gl.getUniformLocation(program, "uAmpDetail");
    const uFlow = gl.getUniformLocation(program, "uFlow");

    gl.useProgram(program);
    gl.uniform1i(uTex, 0);

    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      // DPR cap keeps it smooth on retina without overworking the GPU.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    let texW = 1;
    let texH = 1;

    const draw = (tMs) => {
      setCanvasSize();

      gl.useProgram(program);

      const t = reducedMotionRef.current ? 0 : tMs * 0.001;
      gl.uniform1f(uTime, t);
      gl.uniform1f(uAmpBase, 0.018); // subtle baseline refraction
      gl.uniform1f(uAmpDetail, 0.040); // stronger on edges/text
      gl.uniform1f(uFlow, 0.28); // very slow ambient motion
      gl.uniform2f(uTexel, 1.0 / texW, 1.0 / texH);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const scheduleCapture = () => {
      if (captureRafRef.current) return;
      captureRafRef.current = requestAnimationFrame(async () => {
        captureRafRef.current = null;

        // Throttle captures during fast scroll.
        const now = performance.now();
        if (now - lastCaptureAtRef.current < 120) return;
        lastCaptureAtRef.current = now;

        const headerEl = document.querySelector(headerSelector);
        if (!headerEl) return;

        const rect = headerEl.getBoundingClientRect();
        const width = Math.max(1, Math.floor(rect.width));
        const height = Math.max(1, Math.floor(rect.height));
        if (height < 1 || width < 1) return;

        // Lazy-load html2canvas only when needed.
        let html2canvas;
        try {
          html2canvas = (await import("html2canvas")).default;
        } catch {
          return;
        }

        // Capture only the strip of the page behind the fixed header.
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const scrollX = window.scrollX || window.pageXOffset || 0;

        // Lower scale for performance; shader hides minor softness.
        const captureScale = 0.8;

        const captured = await html2canvas(document.body, {
          backgroundColor: null,
          scale: captureScale,
          useCORS: true,
          logging: false,
          x: scrollX,
          y: scrollY,
          width,
          height,
          windowWidth: document.documentElement.clientWidth,
          windowHeight: window.innerHeight,
          scrollX: 0,
          scrollY: 0,
          ignoreElements: (el) => {
            // Ignore the header itself to avoid recursion / double-render.
            if (!el) return false;
            if (el === headerEl) return true;
            if (headerEl.contains(el)) return true;
            return false;
          },
        });

        // Upload captured canvas into the WebGL texture.
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, captured);
        texW = captured.width;
        texH = captured.height;
      });
    };

    // Initial capture and updates.
    scheduleCapture();
    const onScroll = () => scheduleCapture();
    const onResize = () => scheduleCapture();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (captureRafRef.current) cancelAnimationFrame(captureRafRef.current);
    };
  }, [headerSelector, shaderSource]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={style}
      aria-hidden="true"
    />
  );
}

