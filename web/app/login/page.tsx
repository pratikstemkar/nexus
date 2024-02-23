"use client";

import { AuthContext, UserInfo } from "@/utils/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "@/constants";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { authenticated } = useContext(AuthContext);

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
                return router.push("/");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-w-full min-h-screen">
            <form className="flex flex-col md:w-1/5">
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
                <button
                    className="p-3 mt-6 rounded-md bg-blue-500 active:bg-blue-700 font-bold text-white"
                    type="submit"
                    onClick={submitHandler}
                >
                    login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
