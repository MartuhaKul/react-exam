import React from "react";

interface LoginFormProps {
    username: string;
    password: string;
    setUsername: (value: string) => void;
    setPassword: (value: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    loading: boolean;
    error: string | null;
}

export const LoginForm = ({
                                                        username,
                                                        password,
                                                        setUsername,
                                                        setPassword,
                                                        handleSubmit,
                                                        loading,
                                                        error
                                                    }:LoginFormProps) => {
    return (
        <div className="flex">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="">
                <div className="mb-4">
                    <label className="">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="">
                    <label className="">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="">{error}</p>}
                <button
                    type="submit"
                    className=""
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};
