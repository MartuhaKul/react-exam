import {Outlet} from "react-router-dom";
import {MenuComponent} from "../components/menu-component/MenuComponent.tsx";
import {useAppSelector} from "../redux/store"; // доступ до стейту користувача

export const MainLayout = () => {
    const user = useAppSelector(state => state.authStoreSlice.user); // доступ до користувача з Redux

    return (
        <div>
            <MenuComponent />
            <div className="flex flex-col items-center justify-center min-h-screen">
                {!user && (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">You are not logged in</h2>
                        <p>Please log in to access the full functionality.</p>
                    </div>
                )}
                <Outlet />
            </div>
        </div>
    );
};
