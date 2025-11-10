import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalyticsScript from "~/components/GoogleAnalyticsScript";
import MicrosoftClarity from "~/components/MicrosoftClarity";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CraftyAam — Crafted Like an Aam",
  description:
    "CraftyAam is a creative tech studio where sharp code meets juicy ideas. We craft delightful digital experiences that stand out, spark engagement, and leave a lasting flavour.",
  keywords: [
    "CraftyAam",
    "web development studio",
    "creative agency",
    "freelance web design",
    "startup website design",
    "custom websites",
    "India web studio",
  ],
  authors: [{ name: "CraftyAam", url: "https://craftyaam.com" }],
  creator: "CraftyAam",
  publisher: "CraftyAam",
  metadataBase: new URL("https://craftyaam.com"),
  openGraph: {
    title: "CraftyAam — Crafted Like an Aam",
    description:
      "CraftyAam is a creative tech studio where sharp code meets juicy ideas. We craft delightful digital experiences that stand out, spark engagement, and leave a lasting flavour.",
    url: "https://craftyaam.com",
    siteName: "CraftyAam",
    images: [
      {
        url: "https://craftyaam.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CraftyAam - Crafted Like an Aam",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CraftyAam — Crafted Like an Aam",
    description:
      "CraftyAam is a creative tech studio where sharp code meets juicy ideas. We craft delightful digital experiences that stand out, spark engagement, and leave a lasting flavour.",
    images: ["https://craftyaam.com/og-image.png"],
    // creator: "@craftyaam", // optional if you have a handle
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "technology",
  alternates: {
    canonical: "https://craftyaam.com",
  },
};

export const viewport: Viewport = {
  themeColor: "#F9C74F",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
        <GoogleAnalyticsScript />
        <MicrosoftClarity />
      </body>
    </html>
  );
}
