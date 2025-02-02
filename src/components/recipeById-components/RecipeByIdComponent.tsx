import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import { recipeActions } from "../../redux/slices/recipeByIdSlice.ts";
import { RecipeByIdInfo } from "./RecipeByIdInfo.tsx";

export const RecipeByIdComponent = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const { recipe, loading, error } = useAppSelector((state) => state.recipeByIdStoreSlice);

    useEffect(() => {
        if (id) {
            dispatch(recipeActions.loadRecipeById(id));
        } else {
            console.error("Recipe ID is missing");
        }
    }, [dispatch, id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading recipe data: {error}</div>;

    return (
        <div className="recipe-page p-6">
            {recipe ? (
                <RecipeByIdInfo recipe={recipe} />
            ) : (
                <p>Recipe not found</p>
            )}
        </div>
    );
};
