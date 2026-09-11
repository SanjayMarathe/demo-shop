import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demo Shop",
  description: "Throwaway demo store for testing error capture",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="logo">
            Demo Shop
          </Link>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/cart">Cart</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
