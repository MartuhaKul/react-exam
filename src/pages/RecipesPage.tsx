import {RecipesComponent} from "../components/recipes-components/RecipesComponent.tsx";
import {PaginationComponent} from "../components/pagination/PaginationComponent.tsx";

export const RecipesPage = () => {
    return (
        <>
            <RecipesComponent/>
            <PaginationComponent/>
        </>
    );
};