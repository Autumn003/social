/*
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const googleAuthClientID = process.env.GoogleClientID || "";
const queryClient = new QueryClient();

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId={googleAuthClientID}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
        <ReactQueryDevtools/>
      </QueryClientProvider>
      </body>
      </GoogleOAuthProvider>
    </html>
  );
}

*/





// app/layout.tsx (or wherever your RootLayout is defined)
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientProviders from "./ClientProviders";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleAuthClientID = process.env.GoogleClientID || "";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId={googleAuthClientID}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
      </GoogleOAuthProvider>
    </html>
  );
}
