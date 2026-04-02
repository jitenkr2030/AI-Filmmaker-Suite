import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Filmmaker Suite - Transform Scripts into Movies with AI",
  description: "Complete AI-powered filmmaking platform. Transform your scripts into storyboards, character designs, posters, and video teasers using artificial intelligence.",
  keywords: ["AI", "Filmmaking", "Movie", "Script", "Storyboard", "Character Design", "Video", "Next.js", "React"],
  authors: [{ name: "AI Filmmaker Suite Team" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "AI Filmmaker Suite",
    description: "Transform your scripts into complete visual productions with AI",
    url: "https://aifilmmaker.ai",
    siteName: "AI Filmmaker Suite",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "AI Filmmaker Suite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Filmmaker Suite",
    description: "Transform your scripts into complete visual productions with AI",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}