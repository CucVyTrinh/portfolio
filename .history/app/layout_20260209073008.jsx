import { Raleway } from "next/font/google";
import { Herr_Von_Muellerhoff } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-raleway",
  subsets: ["latin"],
});

const herrVonMuellerhoff = Herr_Von_Muellerhoff({
  weight: "400",
  variable: "--font-script",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vy Trinh Designer | Graphic Designer",
  description:
    "Specializing in Graphic Design, UX/UI Design, and Front-End Development. CUC VY TRINH portfolio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} ${herrVonMuellerhoff.variable}`}>
        <div className="pageWrap">
          <div className="pageBgBlend" aria-hidden />
          <div className="globalBgImages" aria-hidden>
            <div className="globalBgImgWrap" data-img="empathy">
              <img src="/landing/empathy.png" alt="" />
            </div>
            <div className="globalBgImgWrap" data-img="creativity">
              <img src="/landing/creativity.png" alt="" />
            </div>
            <div className="globalBgImgWrap" data-img="perfection">
              <img src="/landing/perfection.png" alt="" />
            </div>
            <div className="globalBgImgWrap" data-img="collaboration">
              <img src="/landing/collaboration.png" alt="" />
            </div>
          </div>
          <div className="grain" aria-hidden />
          <div className="grainNoise" aria-hidden />
          {/* SVG filters for header + background grain */}
          <svg aria-hidden="true" style={{ position: "absolute", width: 0, height: 0 }}>
            <defs>
              <filter id="grainNoise" x="0" y="0">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
                <feColorMatrix in="noise" type="saturate" values="0" result="mono" />
              </filter>
              <filter id="headerLiquidGlass" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="4" result="turb" />
                <feDisplacementMap in="blur" in2="turb" scale="5" xChannelSelector="R" yChannelSelector="G" result="disp" />
                <feColorMatrix in="disp" type="saturate" values="2" result="sat" />
                <feMerge>
                  <feMergeNode in="sat" />
                </feMerge>
              </filter>
            </defs>
          </svg>
          {children}
        </div>
      </body>
    </html>
  );
}
