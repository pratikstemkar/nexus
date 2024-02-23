import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Create your account.",
};

export default function SignUpLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
