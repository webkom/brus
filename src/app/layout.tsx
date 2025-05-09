import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TanstackProvider } from "./components/TanstackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bruuuus",
  description: "Brus system for Webkom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <meta httpEquiv="refresh" content="86400" /> */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
