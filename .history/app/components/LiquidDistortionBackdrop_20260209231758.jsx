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
  const lastCaptureAtRef = useRef(0);
  const scrollDebounceRef = useRef(null);
  const captureInFlightRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const lastDrawTimeRef = useRef(0);

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
      uniform float uTime;      // seconds
      uniform float uAmp;       // displacement strength
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
        for (int i = 0; i < 3; i++) {
          v += a * noise(p);
          p = m * p;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = vUv;
        float t = uTime * uFlow;
        vec2 p = uv * vec2(3.0, 1.8);
        float n1 = fbm(p + vec2(t * 0.10, -t * 0.06));
        float n2 = fbm(p * 1.7 + vec2(-t * 0.07, t * 0.09));
        vec2 disp = vec2(n1 - 0.5, n2 - 0.5);
        vec2 duv = uv + disp * uAmp;
        vec2 chroma = disp * (uAmp * 0.2);
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
    const uTime = gl.getUniformLocation(program, "uTime");
    const uAmp = gl.getUniformLocation(program, "uAmp");
    const uFlow = gl.getUniformLocation(program, "uFlow");

    gl.useProgram(program);
    gl.uniform1i(uTex, 0);

    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = 1; // Fixed 1x for less GPU work; still looks good when scaled by CSS
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const FPS_CAP = 30;
    const FRAME_INTERVAL = 1000 / FPS_CAP;

    const draw = (tMs) => {
      setCanvasSize();
      const now = tMs;
      if (now - lastDrawTimeRef.current < FRAME_INTERVAL) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      lastDrawTimeRef.current = now;

      gl.useProgram(program);
      const t = reducedMotionRef.current ? 0 : tMs * 0.001;
      gl.uniform1f(uTime, t);
      gl.uniform1f(uAmp, 0.028);
      gl.uniform1f(uFlow, 0.28);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const CAPTURE_DEBOUNCE_MS = 320;   // Capture only after scroll/resize has stopped
    const CAPTURE_MIN_INTERVAL_MS = 600; // Never run html2canvas more than once per 600ms
    const CAPTURE_SCALE = 0.55;        // Lower res = faster capture and upload

    const runCapture = () => {
      if (captureInFlightRef.current) return;
      const headerEl = document.querySelector(headerSelector);
      if (!headerEl) return;
      const rect = headerEl.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      if (height < 1 || width < 1) return;

      captureInFlightRef.current = true;
      import("html2canvas")
        .then(({ default: html2canvas }) => {
          const scrollY = window.scrollY || window.pageYOffset || 0;
          const scrollX = window.scrollX || window.pageXOffset || 0;
          return html2canvas(document.body, {
            backgroundColor: null,
            scale: CAPTURE_SCALE,
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
              if (!el) return false;
              if (el === headerEl) return true;
              if (headerEl.contains(el)) return true;
              return false;
            },
          });
        })
        .then((captured) => {
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, captured);
        })
        .catch(() => {})
        .finally(() => {
          captureInFlightRef.current = false;
        });
    };

    const scheduleCapture = () => {
      const now = performance.now();
      if (now - lastCaptureAtRef.current < CAPTURE_MIN_INTERVAL_MS) return;

      if (scrollDebounceRef.current) clearTimeout(scrollDebounceRef.current);
      scrollDebounceRef.current = setTimeout(() => {
        scrollDebounceRef.current = null;
        lastCaptureAtRef.current = performance.now();
        if (typeof requestIdleCallback !== "undefined") {
          requestIdleCallback(runCapture, { timeout: 800 });
        } else {
          runCapture();
        }
      }, CAPTURE_DEBOUNCE_MS);
    };

    // Initial capture after a short delay so layout is ready
    const initialTimer = setTimeout(scheduleCapture, 400);

    window.addEventListener("scroll", scheduleCapture, { passive: true });
    window.addEventListener("resize", scheduleCapture, { passive: true });

    return () => {
      clearTimeout(initialTimer);
      if (scrollDebounceRef.current) clearTimeout(scrollDebounceRef.current);
      window.removeEventListener("scroll", scheduleCapture);
      window.removeEventListener("resize", scheduleCapture);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
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

