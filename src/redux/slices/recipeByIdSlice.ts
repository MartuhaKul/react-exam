import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IRecipe } from "../../models/IRecipe.ts";

export const loadRecipesByUserId = createAsyncThunk(
    "recipe/loadRecipesByUserId",
    async (userId: string) => {
        const response = await fetch(`/api/recipes?userId=${userId}`);
        return response.json();
    }
);

export const recipeSlice = createSlice({
    name: "recipeStoreSlice",
    initialState: {
        recipes: [] as IRecipe[],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadRecipesByUserId.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadRecipesByUserId.fulfilled, (state, action) => {
                state.loading = false;
                state.recipes = action.payload;
            })
            .addCase(loadRecipesByUserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export const recipeActions = { loadRecipesByUserId };

