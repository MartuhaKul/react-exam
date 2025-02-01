import {IBaseResponseModel} from "../models/IBaseResponseModel.ts";

const BaseUrl = 'https://dummyjson.com';

export const getAllUsers = async <T>(endpoint: string, page: string): Promise<IBaseResponseModel<T>> => {
    const limit = 30;
    const skip = (parseInt(page) - 1) * limit;

    const response = await fetch(`${BaseUrl}${endpoint}?skip=${skip}&limit=${limit}`) // додаємо skip і limit в URL
        .then((response) => response.json());

    console.log(response.users);

    return {
        data: response.users,
        total: response.total,
        skip: response.skip,
        limit: response.limit
    };
};


export const getAllRecipes = async <T>(endpoint: string, page:string):Promise<IBaseResponseModel<T>> => {
    const limit = 10;
    const skip = (parseInt(page) - 1) * limit;

    const response = await fetch(`${BaseUrl}${endpoint}?skip=${skip}&limit=${limit}`) // додаємо skip і limit в URL
        .then((response) => response.json());

    console.log(response.recipes);

    return {
        data: response.recipes,
        total: response.total,
        skip: response.skip,
        limit: response.limit
    };

}