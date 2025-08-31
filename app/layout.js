import "./globals.css";
import Providers from "./providers";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
  variable: "--font-app",
});

export const metadata = { title: "Guitar Shop", description: "Assignment" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Providers>
          <div style={{ minHeight: "100dvh", display: "grid", gridTemplateRows: "1fr auto", background:"#f5deb3", color:"#000",
                        fontFamily: "var(--font-app), system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, sans-serif" }}>
            <div>{children}</div>
            <footer style={{ padding: 16, display: "flex", justifyContent: "center", borderTop: "1px solid #a0522d" }}>
              <LanguageSwitcher />
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
