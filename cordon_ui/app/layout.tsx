import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FooterSection from "@/components/FooterSection";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });
const gilroy = localFont({
  src: [
    {
      path: "../public/fonts/gilroy/Gilroy-Heavy.ttf",
      weight: "800",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-Bold.ttf",
      weight: "600",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-Medium.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-Regular.ttf",
      weight: "200",
    },
    {
      path: "../public/fonts/gilroy/Gilroy-Light.ttf",
      weight: "100",
    },
  ],
  variable: "--font-gilroy",
});

export const metadata: Metadata = {
  title: "CORDON",
  description:
    "Central Oceanographic Repository of Data from Observing Networks",
  icons: {
    icon: "/favicon.ico", // /public path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.svg" sizes="any" />
      <body className={gilroy.className}>
        <div className="min-h-[100vh] flex flex-col justify-between">
          <div>{children}</div>
          <FooterSection />
        </div>
      </body>
    </html>
  );
}
