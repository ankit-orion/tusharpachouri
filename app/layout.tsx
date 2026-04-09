import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://tusharpachouri.vercel.app";

export const metadata: Metadata = {
  title: "Tushar Pachouri | Software Developer",
  description:
    "A software engineer from Mathura, Uttar Pradesh. Building scalable applications, solving complex problems, and crafting secure workflows that bridge complex engineering and human intuition.",
  authors: [{ name: "Tushar Pachouri" }],
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    title: "Tushar Pachouri | Software Developer",
    description:
      "A software engineer from Mathura, Uttar Pradesh. Building scalable applications, solving complex problems, and understanding how systems work.",
    siteName: "Tushar Pachouri",
    url: siteUrl,
    images: [
      {
        url: "/preview-image.png",
        width: 1200,
        height: 630,
        alt: "Tushar Pachouri — Software Developer Portfolio",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tushar Pachouri | Software Developer",
    description:
      "A software engineer from Mathura, Uttar Pradesh. Building scalable applications and crafting secure workflows.",
    images: ["/preview-image.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Runs before React hydrates — prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
      </head>
      <body className={`${inter.className} bg-gray-50 dark:bg-black text-gray-900 dark:text-white antialiased`}>
        <ThemeProvider>
          <div className="max-w-[960px] mx-auto min-h-screen border-x border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 relative">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
