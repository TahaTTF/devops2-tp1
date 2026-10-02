import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quizzo — Questionnaires en ligne",
  description: "Site fictif réalisé pour le TP1 du module DevOps 2.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
