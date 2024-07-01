import type { Metadata } from "next";
import { inter } from "@/ui/fonts/fonts";

 export const metadata: Metadata = {
   title: "Secure Rotate",
   description: "24/7 key rotation security webapp for local files",
 };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blue-50`}>{children}</body>
    </html>
  );
}

