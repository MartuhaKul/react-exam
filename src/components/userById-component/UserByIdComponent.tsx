import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import { recipeActions } from "../../redux/slices/recipeSlice.ts";
import { userActions } from "../../redux/slices/userByIdSlice.ts";
import { IRecipe } from "../../models/IRecipe.ts";
import { UserByIdInfo } from "./userByIdInfo/UserByIdInfo.tsx";
import { IUser } from "../../models/user/IUser.ts";

export const UserByIdComponent = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const { user, loading, error } = useAppSelector((state) => state.userByIdStoreSlice);
    const { userRecipes, recipes } = useAppSelector((state) => state.recipeStoreSlice);

    useEffect(() => {
        if (id) {
            dispatch(userActions.loadUserById({ userId: id }));
        } else {
            console.error("User ID is missing");
        }
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(recipeActions.loadRecipes({ page: "1" }));
    }, [dispatch]);

    useEffect(() => {
        if (id && recipes.length > 0) {
            dispatch(recipeActions.setUserRecipes(id));
        }
    }, [id, recipes, dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading user data: {error}</div>;

    return (
        <div className="user-page">
            {user && <UserByIdInfo user={user as IUser}/>}

            <div className="max-w-md mx-auto p-4 bg-white shadow rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Recipes by {user?.firstName}</h2>
                {userRecipes.length > 0 ? (
                    <ul className="space-y-1">
                        {userRecipes.map((recipe: IRecipe) => (
                            <li key={recipe.id}>
                                <a href={`/recipes/${recipe.id}`} className="text-blue-500 hover:underline">
                                    {recipe.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No recipes found</p>
                )}
            </div>

        </div>
    );
};
