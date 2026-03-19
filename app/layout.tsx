import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_TC } from "next/font/google";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
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
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className={`${serif.variable} ${sans.variable}`}>
        <div className="site-frame">
          <header className="site-header">
            <div className="shell header-inner">
              <Link className="brand" href="/">
                Gal and Love
              </Link>
              <nav className="header-nav">
                <Link href="/reading/love">戀愛</Link>
                <Link href="/reading/work">工作</Link>
                <Link href="/reading/finance">金融</Link>
                <Link href="/about">關於</Link>
              </nav>
            </div>
          </header>
          {children}
          <footer className="site-footer">
            <div className="shell footer-inner">
              <p>{siteConfig.description}</p>
              <div className="footer-links">
                <Link href="/privacy">隱私權政策</Link>
                <Link href="/terms">使用條款</Link>
                <Link href="/about">服務說明</Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
