import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser.ts";

type UserSliceType = {
    user: IUser | null;
    loading: boolean;
    error: string | null;
};


export const loadUserById = createAsyncThunk(
    "user/loadUserById",
    async (userId: string) => {
        const response = await fetch(`/api/users/${userId}`);
        const text = await response.text(); // Отримуємо відповідь як текст
        console.log(text); // Логуємо відповідь
        try {
            return JSON.parse(text); // Спробуємо парсити JSON
        } catch (error) {
            console.log(error);
            throw new Error('Failed to parse response as JSON');
        }
    }
);


const initUserSliceState: UserSliceType = {
    user: null,
    loading: false,
    error: null
};


export const userByIdSlice = createSlice({
    name: "userStoreSlice",
    initialState: initUserSliceState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadUserById.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loadUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export const userActions = { loadUserById };
