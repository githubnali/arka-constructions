import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARKA Constructions | Civil, Industrial & Residential Works",
  description: "ARKA Constructions, based in Maraimalai Nagar, Chengalpattu. Explore civil, RCC, industrial, fabrication, finishing and maintenance services. Discuss your project with our team.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
