'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Navbar from "./_components/navbar/Navbar";
import Footer from "./_components/Footer/Footer";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Tawasul</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="A modern social media platform." />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: 'white', 
        }}
      >
        <AppRouterCacheProvider>
          <Provider store={store}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '98vh',
                backgroundColor: 'white', 
              }}
            >
              <Navbar />
              <main style={{ flex: 1 }}>{children}</main>
              <Toaster />
              <Footer />
            </div>
          </Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
