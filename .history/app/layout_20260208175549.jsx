import { Geist, Geist_Mono } from "next/font/google";
import { Raleway } from "next/font/google";
import { Herr_Von_Muellerhoff } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ralewayBlack = Raleway({
  weight: "900",
  variable: "--font-raleway-black",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ralewayBlack.variable} ${herrVonMuellerhoff.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
