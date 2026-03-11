import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import getSongs from "@/actions/getSongs";
import Player from "./components/Player";
// import SupabaseProvider from "@/providers/SupabaseProvider";

const figtree = Figtree({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to music!",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsByUserId();
  //const userSongs = await getSongs();
  return (
    <html lang="en">
      <body className={figtree.variable}>
        <ToasterProvider/>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>
              {children}
              </Sidebar>
              <Player/>
          </UserProvider>
      </body>
    </html>
  );
}
