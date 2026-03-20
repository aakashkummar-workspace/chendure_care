import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chendure CARE+ | Health Dashboard",
  description: "Patient Engagement and Follow-up Automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/chatbot-widget.css" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
        <script src="/chatbot-widget.js" defer></script>
      </body>
    </html>
  );
}
