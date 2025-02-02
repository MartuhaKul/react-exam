import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/store.ts";
import { logout } from "../../redux/slices/authSlice.ts";
import "../../css/MenuStyle.css";

export const MenuComponent = () => {
    const {user} = useAppSelector(state => state.authStoreSlice);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="menu">
            <ul className="flex space-x-4 items-center">
                <li><Link to={'/'}>Home</Link></li>
                {!user ? (
                    <li><Link to={'/auth'}>Login</Link></li>
                ) : (
                    <>
                        <li className="flex items-center space-x-2">
                            <Link to={`/users/${user.id}`} className="flex items-center space-x-2">
                                <img
                                    src={user.image}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-blue-500 transition"
                                />
                            </Link>
                        </li>
                        <li><Link to={'/users'}>Users</Link></li>
                        <li><Link to={'/recipes'}>Recipes</Link></li>
                        <li
                            className="cursor-pointer text-red-500 hover:text-red-700 transition"
                            onClick={handleLogout}>
                            Logout
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};
