import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { login as apiLogin } from "../../services/api.login.service.ts";
import { IUserWithTokens } from "../../models/IUserWithTokens.ts";


type AuthSliceType = {
    user: IUserWithTokens | null;
    loading: boolean;
    error: string | null;
}


const initiAuthSliceState: AuthSliceType = {
    user: null,
    loading: false,
    error: null,
};


export const loginUser = createAsyncThunk<IUserWithTokens, {username:string,password:string}>(
    "auth/loginUser",
    async ({ username, password }, thunkAPI) => {
    try {
        const user:IUserWithTokens = await apiLogin({ username, password, expiresInMins: 60 });
        return thunkAPI.fulfillWithValue(user);
    } catch (e) {
        console.error(e);
        return thunkAPI.rejectWithValue('Login failed');
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState: initiAuthSliceState,
    reducers: {
        logout(state) {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action:PayloadAction<IUserWithTokens>) => {
                state.loading = false;
                state.user = action.payload;
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;

