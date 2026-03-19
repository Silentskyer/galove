import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

const sans = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Gal and Love | 運勢與命運解析",
  description:
    "以星座、紫微斗數、塔羅結合 AI 建議，提供戀愛、工作、金融等主題的命運解析。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className={`${serif.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}

