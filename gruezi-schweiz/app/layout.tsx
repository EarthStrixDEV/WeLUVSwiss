import type { Metadata } from "next";
import { Bodoni_Moda, Karla } from "next/font/google";
import { BottomTabBar } from "@/components/BottomTabBar";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Grüezi Schweiz — A backpacker's guide to Switzerland",
    template: "%s · Grüezi Schweiz",
  },
  description:
    "An independent guide for backpackers and slow travellers in Switzerland — routes, rail passes, hostels and the corner-shop chocolate that make it affordable on a backpack budget.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bodoni.variable} ${karla.variable}`}>
      <body>
        {children}
        <BottomTabBar />
      </body>
    </html>
  );
}
