import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import AuthContextProvider from "@/utils/AuthProvider";
import WebSocketProvider from "@/utils/WebsocketProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        template: "Nexus | %s",
        default: "Nexus",
    },
    description: "Chat with anyone.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthContextProvider>
                    <WebSocketProvider>
                        <Navbar />
                        {children}
                    </WebSocketProvider>
                </AuthContextProvider>
            </body>
        </html>
    );
}
