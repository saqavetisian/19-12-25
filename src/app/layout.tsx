import type { Metadata } from "next";
import { Cormorant_Garamond, Crimson_Text, Lora } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Suspense } from "react";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

const crimson = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Վանիկ & Մարի - Հարսանիքի հրավեր",
  description: "Վանիկի և Մարիի հարսանիքի հրավեր",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hy">
      <body
        className={`${cormorant.variable} ${crimson.variable} ${lora.variable} antialiased`}
      >
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-soft-gray-600">Loading...</div></div>}>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </Suspense>
      </body>
    </html>
  );
}
