import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/organism/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Inventory Admin Console",
  description: "Inventory health and sales analytics",
};

const themeScript = `(function() {
  try {
    var savedTheme = localStorage.getItem('dashboard-theme');
    if (savedTheme === 'light') {
      document.documentElement.dataset.theme = 'light';
    } else {
      document.documentElement.dataset.theme = 'dark';
    }
  } catch (e) {}
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${inter.className} min-h-full bg-slate-950 text-slate-100 antialiased`}
      >
        <div className="flex min-h-screen w-full flex-col md:h-screen md:flex-row md:overflow-hidden">
          <Sidebar />
          <div className="flex flex-1 flex-col md:min-h-0 md:overflow-y-auto">
            <main className="flex-1">{children}</main>
          </div>
        </div>
        <ToastContainer theme="dark" position="top-right" />
      </body>
    </html>
  );
}
