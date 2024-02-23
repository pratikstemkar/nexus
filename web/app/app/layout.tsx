import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chat",
    description: "Chat with anyone.",
};

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
