import {Link} from "react-router-dom";
import {IUser} from "../../models/user/IUser.ts";

interface IUserProps {
    item: IUser;
}
export const UserComponent = ({ item }: IUserProps) => {
    return (
        <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 transition-transform hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                <Link to={`/users/${item.id}`} className="text-blue-500 hover:underline">
                    {item.id} {item.firstName} {item.lastName}
                </Link>
            </h3>
            <p className="text-gray-600">{item.username}</p>
            <p className="text-gray-600">{item.email}</p>
        </div>
    );
};

