import { IRecipe } from "../../models/IRecipe";
import "../../css/RecipeByIdInfo.css"

interface RecipeDetailsProps {
        recipe: IRecipe;
}

export const RecipeByIdInfo = ({ recipe }: RecipeDetailsProps) => {
        return (
            <div className='container'>
                <h1 className='title'>{recipe.name}</h1>
                <img src={recipe.image} alt={recipe.name} className='recipe-image'/>

                <p className='recipe-info'><span>Difficulty:</span> {recipe.difficulty}</p>
                <p className='recipe-info'><span>Category:</span> {recipe.cuisine}</p>
                <p className='recipe-info'><span>Calories per serving:</span> {recipe.caloriesPerServing}</p>
                <p className='recipe-info'><span>Prep time:</span> {recipe.prepTimeMinutes} minutes</p>
                <p className='recipe-info'><span>Cook time:</span> {recipe.cookTimeMinutes} minutes</p>
                <p className='recipe-info'><span>Servings:</span> {recipe.servings}</p>
                <p className='recipe-info'>
                    <span>Rating:</span> {recipe.rating} <span
                    className="text-yellow-500">★</span> ({recipe.reviewCount} reviews)
                </p>
                <p className='recipe-info'><span>Meal Type:</span> {recipe.mealType.join(", ")}</p>
                <p className='recipe-info'><span>Tags:</span> {recipe.tags.join(", ")}</p>

                <h2 className='ingredients-list'>Ingredients:</h2>
                <ul className='ingredients-list'>
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>

                <h2 className='instructions-list'>Instructions:</h2>
                <ol className='instructions-list'>
                    {recipe.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
            </div>
        );
};
