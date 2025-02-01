import axios from "axios";
import {IUserWithTokens} from "../models/IUserWithTokens.ts";
import {retriveLocalStorage} from "./helpers.ts";
import {ITokenPair} from "../models/ITokenPair.ts";

const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/auth',
    headers: {}
});

type LoginData = {
    username: string;
    password: string;
    expiresInMins: number;
}


axiosInstance.interceptors.request.use((requestObject) => {
    if (requestObject.method?.toUpperCase() === "GET") {
        requestObject.headers.Authorization = 'Bearer ' + retriveLocalStorage<IUserWithTokens>('user').accessToken;
    }
    return requestObject;
})

export const login = async ({username, password, expiresInMins}: LoginData): Promise<IUserWithTokens> => {
    const {data: userWithTokens} = await axiosInstance.post<IUserWithTokens>("/login", {
        username,
        password,
        expiresInMins
    });
    console.log(userWithTokens);
    localStorage.setItem("user", JSON.stringify(userWithTokens));
    return userWithTokens;
}
//
// export const loadAuthProducts = async (): Promise<IProduct[]> => {
//     const {data: {products}} = await axiosInstance.get<IProductsResponseModel>("/products");
//     return products;
// }

export const refresh = async () => {
    const iUserWithTokens = retriveLocalStorage<IUserWithTokens>('user');
    const {
        data: {
            refreshToken,
            accessToken
        }
    } = await axiosInstance.post<ITokenPair>("/refresh", {
        refreshToken: iUserWithTokens.refreshToken,
        expiresInMins: 1
    });
    iUserWithTokens.refreshToken = refreshToken;
    iUserWithTokens.accessToken = accessToken;
    localStorage.setItem("user", JSON.stringify(iUserWithTokens));
}