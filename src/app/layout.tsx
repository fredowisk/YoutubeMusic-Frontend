import "./styles/global.scss";

import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

import { Header } from "@/components/Header";

import { VideoContextProvider } from "@/contexts/VideoContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <VideoContextProvider>
          <Header />
          {children}
        </VideoContextProvider>
      </body>
    </html>
  );
}
