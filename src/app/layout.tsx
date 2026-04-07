import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
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
        className={`${nunito.variable} min-h-screen bg-zinc-950 font-nunito text-zinc-100`}
      >
        {children}
      </body>
    </html>
  );
}
