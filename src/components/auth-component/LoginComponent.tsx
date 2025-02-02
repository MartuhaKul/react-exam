import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import { loginUser } from "../../redux/slices/authSlice.ts";
import { LoginForm } from "./LoginFormComponent.tsx";

export const LoginComponent = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector(state => state.authStoreSlice);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
    };

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
