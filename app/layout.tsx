import type { Metadata } from "next";
import { Sora, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apply — Legacy Labs Inner Circle",
  description:
    "Apply to join Legacy Labs Inner Circle and build your AI automation agency with the AI Operator Method™. Get a free personalized gameplan instantly.",
  metadataBase: new URL("https://legacylabs.club"),
  openGraph: {
    title: "Apply — Legacy Labs Inner Circle",
    description:
      "Apply to Legacy Labs Inner Circle. Get a free AI Operator Gameplan tailored to your exact stage and bottleneck.",
    type: "website",
    siteName: "Legacy Labs Inner Circle",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply — Legacy Labs Inner Circle",
    description:
      "Apply to Legacy Labs Inner Circle. Get a free AI Operator Gameplan tailored to your exact stage.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
