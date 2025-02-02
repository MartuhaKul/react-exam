import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { userActions } from "../redux/slices/userByIdSlice.ts";
import { recipeActions } from "../redux/slices/recipeByIdSlice.ts";

export const UserPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();


    const {user, loading, error } = useAppSelector((state) => state.userByIdStoreSlice);
    const { recipes } = useAppSelector((state) => state.recipeByIdStoreSlice);

    useEffect(() => {
        if (id) {
            dispatch(userActions.loadUserById(id)); // Завантажуємо користувача
            dispatch(recipeActions.loadRecipesByUserId(id)); // Завантажуємо рецепти
        }
    }, [dispatch, id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading user data: {error}</div>;

    return (
        <div className="user-page">
            {user && (
                <div>
                    <h1>{user.firstName} {user.lastName}</h1>
                    <img src={user.image} alt="User Avatar" className="user-avatar" />
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>

                </div>
            )}

            {/* Секція з рецептами */}
            <div className="recipes-list">
                <h2>Recipes by {user?.firstName}</h2>
                {recipes && recipes.length > 0 ? (
                    <ul>
                        {recipes.map((recipe) => (
                            <li key={recipe.id}>
                                <a href={`/recipes/${recipe.id}`}>{recipe.name}</a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No recipes found</p>
                )}
            </div>
        </div>
    );
};
