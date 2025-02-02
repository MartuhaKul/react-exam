import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/store.ts";
import { logout } from "../../redux/slices/authSlice.ts";
import "./MenuStyle.css";

export const MenuComponent = () => {
    const { user } = useAppSelector(state => state.authStoreSlice);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="menu">
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                {!user ? (
                    <li><Link to={'/auth'}>Login</Link></li>
                ) : (
                    <>
                        <li className="flex items-center">
                            <img
                                src={user.image}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full border-2 border-gray-300"
                            />
                            <span className="ml-2">{user.firstName}</span>
                        </li>
                        <li><Link to={'/users'}>Users</Link></li>
                        <li><Link to={'/recipes'}>Recipes</Link></li>
                        <li
                            className="cursor-pointer text-red-500"
                            onClick={handleLogout}>
                            Logout
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};
