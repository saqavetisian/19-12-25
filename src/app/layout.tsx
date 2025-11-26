import type { Metadata } from "next";
import { Cormorant_Garamond, Crimson_Text, Lora, Dancing_Script, Great_Vibes, Noto_Serif_Armenian, Playfair_Display } from "next/font/google";
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

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

const notoSerifArmenian = Noto_Serif_Armenian({
  variable: "--font-armenian",
  subsets: ["armenian", "latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
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
        className={`${cormorant.variable} ${crimson.variable} ${lora.variable} ${dancingScript.variable} ${greatVibes.variable} ${notoSerifArmenian.variable} ${playfair.variable} antialiased`}
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
