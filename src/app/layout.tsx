import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Investment Portfolio",
  description:
    "This investment portfolio website lets us easily track and view our investments with a simple, intuitive dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
