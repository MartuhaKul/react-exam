import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import { loginUser, refreshToken } from "../../redux/slices/authSlice.ts";
import { LoginForm } from "./LoginFormComponent.tsx";
import { useNavigate } from "react-router-dom";

export const LoginComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useAppSelector(state => state.authStoreSlice);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") as string);
        if (user && user.refreshToken) {
            dispatch(refreshToken());
        }
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            loading={loading}
            error={error}
        />
    );
};
