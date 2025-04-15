import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "I Have 30 Minutes",
  description: "Just enough time to make your day more interesting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased dark`}>
        {children}
      <footer className="absolute bottom-0 left-0 right-0 py-4 text-center text-xs text-muted-foreground">
        built with ⚡️ by <Link href="https://tamerable.com" className="text-foreground hover:underline">Tamer</Link> | <Link className="text-foreground hover:underline" href="https://linkedin.com/in/tamerable">have a task suggestion?</Link>
      </footer>
      </body>
    </html>
  );
}
