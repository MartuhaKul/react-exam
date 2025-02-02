import {IBaseResponseModel} from "../models/IBaseResponseModel.ts";
import {axiosInstance} from "./api.login.service.ts";
import {IUserWithTokens} from "../models/user/IUserWithTokens.ts";
import {IRecipe} from "../models/IRecipe.ts";

const BaseUrl = 'https://dummyjson.com/auth';

export const getAllUsers = async <T>(endpoint: string, page: string): Promise<IBaseResponseModel<T>> => {
    const limit = 30;
    const skip = (parseInt(page) - 1) * limit;

    const response = await axiosInstance.get(`${BaseUrl}${endpoint}?skip=${skip}&limit=${limit}`);

    console.log(response.data.users);

    return {
        data: response.data.users,
        total: response.data.total,
        skip: response.data.skip,
        limit: response.data.limit
    };
};



export const getAllRecipes = async <T>(endpoint: string, page:string):Promise<IBaseResponseModel<T>> => {
    const limit = 10;
    const skip = (parseInt(page) - 1) * limit;

    const response = await axiosInstance.get(`${BaseUrl}${endpoint}?skip=${skip}&limit=${limit}`) // додаємо skip і limit в URL

    console.log(response.data.recipes);

    return {
        data: response.data.recipes,
        total: response.data.total,
        skip: response.data.skip,
        limit: response.data.limit
    };

}

export const getUserById = async (userId: string): Promise<IBaseResponseModel<IUserWithTokens>> => {
    try {
        const response = await axiosInstance.get(`${BaseUrl}/users/${userId}`);
        console.log(response.data);

        return {
            data: response.data,
            total: 1,
            skip: 0,
            limit: 1
        };
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};

export const getRecipeById = async (recipeId: string): Promise<IBaseResponseModel<IRecipe>> => {
    try {
        const response = await axiosInstance.get(`${BaseUrl}/recipes/${recipeId}`);
        console.log(response.data);

        return {
            data: response.data,
            total: 1,
            skip: 0,
            limit: 1
        };
    } catch (error) {
        console.error("Error fetching recipe by ID:", error);
        throw error;
    }
};

