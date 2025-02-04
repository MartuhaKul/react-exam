import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {useEffect} from "react";
import {recipeActions} from "../../redux/slices/recipeSlice.ts";
import {useSearchParams} from "react-router-dom";
import {RecipeComponent} from "./RecipeComponent.tsx";
import {SearchBarComponent} from "../searchbar-component/SearchBarComponent.tsx";

export const RecipesComponent = () => {
    const dispatch = useAppDispatch();
    const recipes = useAppSelector((state) => state.recipeStoreSlice.recipes) || [];
    const loading = useAppSelector((state) => state.recipeStoreSlice.loading);
    const error = useAppSelector((state) => state.recipeStoreSlice.error);

    const [query] = useSearchParams();
    const page:string = query.get("page") || '1';

    useEffect(() => {
        dispatch(recipeActions.loadRecipes({page}))
    }, [dispatch, page]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading recipes: {error}</div>;
    return (
        <div className='flex flex-col items-center justify-center gap-5'>
            <SearchBarComponent/>
           <div className='grid grid-cols-3 grid-rows-3 gap-4'>
            {recipes.map((recipe) => (<RecipeComponent key={recipe.id} item={recipe} />))}
           </div>
        </div>
    );
};