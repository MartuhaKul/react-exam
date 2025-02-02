import { useAppSelector } from "../../redux/store.ts";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SearchBarComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const users = useAppSelector((state) => state.userStoreSlice.users) || [];
    const recipes = useAppSelector((state) => state.recipeStoreSlice.recipes) || [];

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        if (!searchTerm.trim()) return;

        if (/^\d+$/.test(searchTerm)) {
            if (location.pathname.includes("users")) {
                navigate(`/users/${searchTerm}`);
            } else if (location.pathname.includes("recipes")) {
                navigate(`/recipes/${searchTerm}`);
            }
            return;
        }

        if (location.pathname.includes("users")) {
            const foundUser = users.find(user =>
                user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (foundUser) navigate(`/users/${foundUser.id}`);
        } else if (location.pathname.includes("recipes")) {
            const foundRecipe = recipes.find(recipe =>
                recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (foundRecipe) navigate(`/recipes/${foundRecipe.id}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white p-2 rounded-lg"
                >
                    OK
                </button>
            </div>
        </div>
    );
};
