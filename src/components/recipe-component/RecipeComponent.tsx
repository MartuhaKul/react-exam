import {IRecipe} from "../../models/IRecipe.ts";

interface IRecipeProps {
    item:IRecipe,
}

export const RecipeComponent = ({item}:IRecipeProps) => {
    return (
        <div>
            <h3>{item.name}</h3>
            <img className="recipe-image" src={item.image} alt={item.name} />
        </div>
    );
};