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
        {children}
      </body>
    </html>
  );
}
