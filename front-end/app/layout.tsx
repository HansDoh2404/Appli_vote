import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Link from "next/link";
import Header from "./components/Header";
import { CurrentUserProvider } from "@/app/hooks/CurrentUser";
// import Header from './components/Header';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "President election",
  description: "Voting the Idsi President",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <CurrentUserProvider>
          <Header />
          {children}
        </CurrentUserProvider>
      </body>
    </html>
  );
}
