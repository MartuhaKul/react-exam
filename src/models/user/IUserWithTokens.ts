import {IUser} from "./IUser.ts";

export interface IUserWithTokens  extends IUser{
    accessToken: string;
    refreshToken: string;
}