import type { Metadata } from "next";
import { Header } from "@/app/components/Header/Header";
import "./reset.css";

export const metadata: Metadata = {
  title: "Authorization",
  description: "Next.js auth demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
