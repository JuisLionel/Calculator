import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

export const metadata: Metadata = {
  icons: { icon: "/favicon.ico" },
};

const digital7 = localFont({
  src: "../public/Font/Calculator/digital-7.ttf",
  display: "swap",
  variable: "--font-digital-7",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full w-full antialiased ${digital7.variable}`}
    >
      <body className="h-full w-full flex flex-col">{children}</body>
    </html>
  );
}
