import {IRecipe} from "../../models/IRecipe.ts";
import {Link} from "react-router-dom";

interface IRecipeProps {
    item:IRecipe,
}

export const RecipeComponent = ({item}:IRecipeProps) => {
    return (
        <div>
            <h3><Link to={`/recipes/${item.id}`}>{item.name}</Link></h3>
            <img className="recipe-image" src={item.image} alt={item.name} />
        </div>
    );
};