import StateProvider from "@/components/state-provider";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
const popins = Poppins({
  subsets: ["latin"], 
  weight: ["400", "700"]  
});

export const metadata: Metadata = {
  title: "Letflix",
  description: "Enjoy your movie you like",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={popins.className}>
        <StateProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            {children}
          </ThemeProvider>
        </StateProvider>
      </body>
    </html>
  );
}
