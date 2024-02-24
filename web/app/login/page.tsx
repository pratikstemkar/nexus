"use client";

import { AuthContext, UserInfo } from "@/utils/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "@/constants";
import Link from "next/link";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { authenticated } = useContext(AuthContext);
    const { setUser, setAuthenticated } = useContext(AuthContext);

    const router = useRouter();

    useEffect(() => {
        if (authenticated) {
            router.push("/");
            return;
        }
    }, [authenticated]);

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                const user: UserInfo = {
                    username: data.username,
                    id: data.id,
                };

                localStorage.setItem("user_info", JSON.stringify(user));
                if (user) {
                    setUser({
                        username: user.username,
                        id: user.id,
                    });
                }
                setAuthenticated(true);
                return router.push("/");
            } else {
                console.log(data);
                setError("Login Failed!");
            }
        } catch (err) {
            console.log(err);
            setError("Server Error!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center lg:mt-40 mt-20">
            <form className="flex flex-col w-1/3 lg:w-1/5">
                <div className="text-3xl font-bold text-center">
                    <span className="text-blue-500">welcome to nexus!</span>
                </div>
                <input
                    placeholder="email"
                    className="p-3 mt-8 rounded-md border-2 border-grey focus:outline-none focus:border-blue text-black"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    className="p-3 mt-4 rounded-md border-2 border-grey focus:outline-none focus:border-blue text-black"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {error !== "" ? (
                    <span className="mt-6 bg-red-500 bg-opacity-30 text-sm px-4 py-2 rounded-md text-red-500">
                        {error}
                    </span>
                ) : null}
                <button
                    className="p-3 mt-4 rounded-md bg-blue-500 active:bg-blue-700 font-bold text-white"
                    type="submit"
                    onClick={submitHandler}
                >
                    login
                </button>
            </form>

            <Link
                href="/signup"
                className="text-blue-500 mt-5 font-medium hover:underline underline-offset-4"
            >
                create your account
            </Link>
        </div>
    );
};

export default LoginPage;
