import {IRecipe} from "../../models/IRecipe.ts";
import {Link} from "react-router-dom";
import "../recipeById-components/recipeByIdConponent/RecipeComponent.css"

interface IRecipeProps {
    item:IRecipe,
}

export const RecipeComponent = ({item}:IRecipeProps) => {
    return (
        <div className='recipe-container'>
            <h3 className='recipe-title'><Link to={`/recipes/${item.id}`}>{item.name}</Link></h3>
            <img className="recipe-image" src={item.image} alt={item.name} />
        </div>
    );
};