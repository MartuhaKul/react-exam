import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout.tsx";
import {UsersPage} from "../pages/UsersPage.tsx";
import {RecipesPage} from "../pages/RecipesPage.tsx";
import {AuthPage} from "../pages/AuthPage.tsx";
import {UserPage} from "../pages/UserPage.tsx";
import {RecipePage} from "../pages/RecipePage.tsx";

export const router = createBrowserRouter([
    {path:'/', element:<MainLayout/>, children:[
            {path:'users', element:<UsersPage/>},
            {path:'users/:id', element:<UserPage/>},
            {path:'recipes', element:<RecipesPage/>},
            {path:'recipes/:id', element:<RecipePage/>},
            {path:'auth', element:<AuthPage/>},
        ]},
]);