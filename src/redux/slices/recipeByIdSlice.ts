import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { IRecipe } from "../../models/IRecipe.ts";
import { getRecipeById } from "../../services/api.service.ts";

type RecipeSliceType = {
    recipe: IRecipe | null;
    loading: boolean;
    error: string | null;
}

export const loadRecipeById = createAsyncThunk<IRecipe, string>(
    "recipe/loadRecipeById",
    async (recipeId, thunkAPI) => {
        try {
            const response = await getRecipeById(recipeId);
            return response.data;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue("Error fetching recipe by ID");
        }
    }
);

const initRecipeSliceState: RecipeSliceType = {
    recipe: null,
    loading: false,
    error: null,
};

export const recipeByIdSlice = createSlice({
    name: "recipeByIdStoreSlice",
    initialState: initRecipeSliceState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadRecipeById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadRecipeById.fulfilled, (state, action:PayloadAction<IRecipe>) => {
                state.loading = false;
                state.recipe = action.payload;
            })
            .addCase(loadRecipeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export const recipeActions = { loadRecipeById };
