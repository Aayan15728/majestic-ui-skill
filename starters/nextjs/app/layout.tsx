import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistSerifRegular } from "geist/font/serif";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sumlight — revenue analytics that names the post that paid",
  description: "Add one script tag. Sumlight follows each visit to the signup and the payment.",
};

// theme-color belongs in the viewport export, one per color scheme
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

// Runs before first paint so a saved theme never flashes the wrong one.
const themeScript = `try{var t=localStorage.getItem("sumlight-theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${GeistSerifRegular.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
