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
  title: "Free AI Operator Roadmap",
  description:
    "Answer a few quick questions and get a custom AI Operator Roadmap built for exactly where you are right now — your path to building, scaling, and winning with AI.",
  metadataBase: new URL("https://legacylabs.club"),
  openGraph: {
    title: "Free AI Operator Roadmap",
    description:
      "Answer a few quick questions and get a custom AI Operator Roadmap built for exactly where you are right now — your path to building, scaling, and winning with AI.",
    type: "website",
    siteName: "Legacy Labs Inner Circle",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Operator Roadmap",
    description:
      "Answer a few quick questions and get a custom AI Operator Roadmap built for exactly where you are right now — your path to building, scaling, and winning with AI.",
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
