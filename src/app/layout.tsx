// src/app/layout.tsx

import type { Metadata } from "next";
// 1. Adicionamos a fonte Inter para o corpo do texto, mantendo a Libre Baskerville para os títulos.
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";

// Configuração da fonte padrão (corpo do texto)
const inter = Inter({
  subsets: ["latin"],
  display: 'swap', // Melhora a performance de carregamento da fonte
  variable: '--font-inter', // Criamos uma variável para a fonte Inter
});

// Configuração da fonte de destaque (títulos)
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre", // A variável que você já tinha criado
});

export const metadata: Metadata = {
  title: "Veritus Capital",
  description: "Gestão de capital para além do convencional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${libreBaskerville.variable} font-serif antialiased bg-brand-dark text-brand-text-light`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}