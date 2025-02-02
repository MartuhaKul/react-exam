import {IRecipe} from "../../models/IRecipe";

interface RecipeDetailsProps {
    recipe: IRecipe;
}

export const RecipeByIdInfo = ({ recipe }:RecipeDetailsProps) => {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-4">{recipe.name}</h1>
            <img src={recipe.image} alt={recipe.name} className="recipe-image mb-6 rounded-lg" />

            <p className="text-xl mb-2"><span className="font-semibold">Difficulty:</span> {recipe.difficulty}</p>
            <p className="text-xl mb-2"><span className="font-semibold">Category:</span> {recipe.cuisine}</p>
            <p className="text-xl mb-2"><span className="font-semibold">Calories per serving:</span> {recipe.caloriesPerServing}</p>
            <p className="text-xl mb-2"><span className="font-semibold">Prep time:</span> {recipe.prepTimeMinutes} minutes</p>
            <p className="text-xl mb-2"><span className="font-semibold">Cook time:</span> {recipe.cookTimeMinutes} minutes</p>
            <p className="text-xl mb-2"><span className="font-semibold">Servings:</span> {recipe.servings}</p>
            <p className="text-xl mb-2"><span className="font-semibold">Rating:</span> {recipe.rating} ⭐ ({recipe.reviewCount} reviews)</p>
            <p className="text-xl mb-2"><span className="font-semibold">Meal Type:</span> {recipe.mealType.join(", ")}</p>
            <p className="text-xl mb-6"><span className="font-semibold">Tags:</span> {recipe.tags.join(", ")}</p>

            <h2 className="text-2xl font-semibold mb-2">Ingredients:</h2>
            <ul className="list-disc pl-6 mb-6">
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-xl">{ingredient}</li>
                ))}
            </ul>

            <h2 className="text-2xl font-semibold mb-2">Instructions:</h2>
            <ol className="list-decimal pl-6">
                {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="text-xl">{instruction}</li>
                ))}
            </ol>
        </div>
    );
};
