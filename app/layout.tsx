import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MoodScape — Discover places by mood and vibe",
  description:
    "MoodScape ti aiuta a scoprire luoghi, percorsi, mappe e Vibe Lists in base a come ti senti e all’atmosfera che vuoi vivere.",
  keywords: [
    "MoodScape",
    "mood based travel",
    "city discovery",
    "vibe map",
    "vibe lists",
    "Roma",
    "places by mood",
  ],
  authors: [{ name: "MoodScape" }],
  creator: "MoodScape",
  openGraph: {
    title: "MoodScape",
    description:
      "Trova posti in base a come ti senti e alla vibe che vuoi seguire.",
    type: "website",
    locale: "it_IT",
    siteName: "MoodScape",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoodScape",
    description:
      "Scopri luoghi, percorsi e vibe nella tua città partendo dal tuo mood.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}