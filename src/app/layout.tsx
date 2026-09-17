import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeToggle } from "@/components/molecule/ThemeToggle";
import { Sidebar } from "@/components/organism/Sidebar/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory Admin Console",
  description: "Inventory health and sales analytics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1">
            <header className="flex justify-end border-b border-slate-800 bg-slate-950 p-4">
              <ThemeToggle />
            </header>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
