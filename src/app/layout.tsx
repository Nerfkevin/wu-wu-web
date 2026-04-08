import type { Metadata } from "next";
import { Instrument_Serif, Space_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wu-Wu",
  description: "Wu-Wu — download on the App Store. wu-wu.com",
  metadataBase: new URL("https://wu-wu.com"),
  appleWebApp: { capable: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${instrumentSerif.variable} ${spaceMono.variable} min-h-screen bg-zinc-950 font-space-mono text-zinc-100`}
      >
        {children}
      </body>
    </html>
  );
}
