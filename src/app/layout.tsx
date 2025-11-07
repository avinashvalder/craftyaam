import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CraftyAam - Crafted like an Aam | Coming Soon",
  description: "We're crafting delightful web experiences with a mango-inspired touch. Join our launch notification list.",
  openGraph: {
    title: "CraftyAam - Crafted like an Aam",
    description: "Delightful web experiences launching soon",
    url: "https://craftyaam.com",
    siteName: "CraftyAam",
    images: [
      {
        url: "https://craftyaam.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CraftyAam - Crafted like an Aam",
    description: "Delightful web experiences launching soon",
    images: ["https://craftyaam.com/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#F9C74F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
