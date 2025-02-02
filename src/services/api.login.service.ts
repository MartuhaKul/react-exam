import axios from "axios";
import {IUserWithTokens} from "../models/user/IUserWithTokens.ts";
import {retriveLocalStorage} from "./helpers.ts";
import {ITokenPair} from "../models/ITokenPair.ts";

export const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/auth',
    headers: {}
});

type LoginData = {
    username: string;
    password: string;
    expiresInMins: number;
}

axiosInstance.interceptors.request.use((requestObject) => {
    // Додаємо токен до всіх запитів
    const user = retriveLocalStorage<IUserWithTokens>('user');
    if (user && user.accessToken) {
        requestObject.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return requestObject;
});

export const login = async ({username, password, expiresInMins}: LoginData): Promise<IUserWithTokens> => {
    const {data: userWithTokens} = await axiosInstance.post<IUserWithTokens>("/login", {
        username,
        password,
        expiresInMins
    });
    console.log(userWithTokens);
    localStorage.setItem("user", JSON.stringify(userWithTokens));
    return userWithTokens;
};

export const refresh = async () => {
    const iUserWithTokens = retriveLocalStorage<IUserWithTokens>('user');
    const {
        data: {
            refreshToken,
            accessToken
        }
    } = await axiosInstance.post<ITokenPair>("/refresh", {
        refreshToken: iUserWithTokens.refreshToken,
        expiresInMins: 60
    });
    iUserWithTokens.refreshToken = refreshToken;
    iUserWithTokens.accessToken = accessToken;
    localStorage.setItem("user", JSON.stringify(iUserWithTokens));
}