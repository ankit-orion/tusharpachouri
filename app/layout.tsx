import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tushar Pachouri | Software Developer",
  description: "Software Developer with experience building scalable applications, RESTful APIs, and microservices.",
  authors: [{ name: "Tushar Pachouri" }],
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
