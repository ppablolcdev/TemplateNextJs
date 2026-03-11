import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Integracion Backend | Prueba Tecnica",
  description: "Frontend en Next.js para consumir cuentas y transacciones del backend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
