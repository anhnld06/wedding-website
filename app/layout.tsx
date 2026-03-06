import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Toaster } from "sonner";
import HeartRain from "@/components/HeartRain";
import { getCurrentEventDate } from "@/lib/wedding-dates";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { metadata: dateStr } = getCurrentEventDate();
  return {
    title: `Anh & Châu Wedding | ${dateStr}`,
    description:
      "You are invited to celebrate the wedding of Anh & Châu. Open the envelope and share your wishes.",
    openGraph: {
      title: "Anh & Châu Wedding Invitation",
      description: `${dateStr} — TanMy Palace, QuangTri`,
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased overflow-hidden`}
      >
        <HeartRain />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#fff1f2",
              border: "1px solid #fecdd3",
              color: "#9f1239",
            },
          }}
        />
      </body>
    </html>
  );
}
