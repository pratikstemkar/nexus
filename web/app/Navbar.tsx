"use client";

import { AuthContext } from "@/utils/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const Navbar = () => {
    const { user, setUser, setAuthenticated, authenticated } =
        useContext(AuthContext);
    const router = useRouter();

    const logoutHandler = () => {
        localStorage.removeItem("user_info");
        setUser({
            username: "",
            id: "",
        });
        setAuthenticated(false);
        router.push("/login");
    };

    return (
        <nav className="px-5 py-2 flex justify-between items-center">
            <Link href={user.username ? "/" : "#"}>
                <h1 className="font-mono text-4xl">Nexus</h1>
            </Link>
            {authenticated ? user.username : null}
            {authenticated ? (
                <button
                    className="bg-red-500 active:bg-red-700 px-4 py-2 rounded-md"
                    onClick={logoutHandler}
                >
                    logout
                </button>
            ) : null}
        </nav>
    );
};

export default Navbar;
