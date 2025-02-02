import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserWithTokens } from "../../models/user/IUserWithTokens.ts";
import { getUserById } from "../../services/api.service.ts";

type UserSliceType = {
    user: IUserWithTokens | null;
    loading: boolean;
    error: string | null;
};

export const loadUserById = createAsyncThunk<IUserWithTokens, { userId: string }>(
    "user/loadUserById",
    async ({ userId }, thunkAPI) => {
        try {
            const response = await getUserById(userId);
            return response.data;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue("Failed to fetch user data");
        }
    }
);

const initUserSliceState: UserSliceType = {
    user: null,
    loading: false,
    error: null,
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
            .addCase(loadUserById.fulfilled, (state, action: PayloadAction<IUserWithTokens>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loadUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Something went wrong";
            });
    },
});

export const userActions = { loadUserById };
