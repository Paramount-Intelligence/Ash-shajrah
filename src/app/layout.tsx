import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-urdu",
  display: "swap",
  preload: false,
});


export const metadata: Metadata = {
  title: "Ash-Shajrah Learning Hub | Online Learning for Values, Creativity & Confidence",
  description:
    "A fully online learning hub for children, parents, and educators — focused on early years learning, Montessori-inspired guidance, character, creativity, confidence, and leadership.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/ash-shajrah-favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/ash-shajrah-favicon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable} ${notoNastaliqUrdu.variable}`}>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
