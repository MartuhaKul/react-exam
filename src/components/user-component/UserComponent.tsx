import { Link } from "react-router-dom";
import { IUser } from "../../models/IUser.ts";

interface IUserProps {
    item: IUser;
}

export const UserComponent = ({ item }: IUserProps) => {
    return (
        <div>
            <h3>
                <Link to={`/users/${item.id}`}>{item.firstName} {item.lastName}</Link>
            </h3>
            <p>{item.email}</p>
            <p>{item.phone}</p>
        </div>
    );
};
