import {Outlet} from "react-router";
import {MenuComponent} from "../components/menu-component/MenuComponent.tsx";

export const MainLayout = () => {
    return (
        <>
            <MenuComponent/>
            <Outlet/>
        </>
    );
};