import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAllRecipes} from "../../services/api.service.ts";
import {IBaseResponseModel} from "../../models/IBaseResponseModel.ts";
import {IRecipe} from "../../models/IRecipe.ts";

type RecipeSliceType = {
    recipes: IRecipe[];
    loading: boolean;
    error: string | null;
};

const loadRecipes = createAsyncThunk<IRecipe[],{page:string}>(
    "loadRecipes",
    async ({page}, thunkAPI) => {
        try {
            const response:IBaseResponseModel<IRecipe[]> = await getAllRecipes('/recipe', page);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (e) {
            console.error(e);
            return thunkAPI.rejectWithValue('error');
        }
    }
);

const initRecipeSliceState: RecipeSliceType = {
    recipes: [],
    loading: false,
    error: null
};

export const recipeSlice = createSlice({
    name: 'recipeSlice',
    initialState: initRecipeSliceState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadRecipes.fulfilled, (state, action: PayloadAction<IRecipe[]>) => {
                state.recipes = action.payload;
                state.loading = false;
            })
            .addCase(loadRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const recipeActions = { ...recipeSlice.actions, loadRecipes };
