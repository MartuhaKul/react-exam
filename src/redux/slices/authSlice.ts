import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { login as apiLogin } from "../../services/api.login.service.ts";
import { IUserWithTokens } from "../../models/user/IUserWithTokens.ts";
import { refresh } from "../../services/api.login.service.ts";

type AuthSliceType = {
    user: IUserWithTokens | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
};

const initAuthSliceState: AuthSliceType = {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    loading: false,
    error: null,
    isAuthenticated: JSON.parse(localStorage.getItem("user") || "null") !== null,
};


export const loginUser = createAsyncThunk<IUserWithTokens, { username: string; password: string }>(
    "auth/loginUser",
    async ({ username, password }, thunkAPI) => {
        try {
            const user: IUserWithTokens = await apiLogin({ username, password, expiresInMins: 60 });
            return thunkAPI.fulfillWithValue(user);
        } catch (e) {
            console.error(e);
            return thunkAPI.rejectWithValue('Login failed');
        }
    }
);

export const refreshToken = createAsyncThunk<IUserWithTokens, void>(
    "auth/refreshToken",
    async (_, thunkAPI) => {
        try {
            const iUserWithTokens: IUserWithTokens = JSON.parse(localStorage.getItem("user") as string);
            if (iUserWithTokens?.refreshToken) {
                await refresh();
                return thunkAPI.fulfillWithValue(iUserWithTokens);
            } else {
                throw new Error("No refresh token found");
            }
        } catch (e) {
            console.error(e);
            return thunkAPI.rejectWithValue("Failed to refresh token");
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState: initAuthSliceState,
    reducers: {
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUserWithTokens>) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })
            .addCase(refreshToken.fulfilled, (state, action: PayloadAction<IUserWithTokens>) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isAuthenticated = false;
            });
    },
});

export const { logout } = authSlice.actions;

