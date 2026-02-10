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
          <div className="grain" aria-hidden />
          <div className="grainNoise" aria-hidden />
          {/* SVG filters for header + background grain */}
          <svg aria-hidden="true" style={{ position: "absolute", width: 0, height: 0 }}>
            <defs>
              <filter id="grainNoise" x="0" y="0">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
                <feColorMatrix in="noise" type="saturate" values="0" result="mono" />
              </filter>
              {/* Pure refraction: displacement only, no blur/color/opacity. Scale 3–6, very soft turbulence. */}
              <filter id="headerRefraction" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
                <feTurbulence id="headerRefractionTurb" type="fractalNoise" baseFrequency="0.007" numOctaves="2" seed="0" result="turb" />
                <feDisplacementMap in="SourceGraphic" in2="turb" scale="4" xChannelSelector="R" yChannelSelector="G" result="disp" />
                <feMerge>
                  <feMergeNode in="disp" />
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
