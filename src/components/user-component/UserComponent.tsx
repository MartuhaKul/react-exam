import {IUser} from "../../models/IUser.ts";

interface IUserProps {
    item: IUser;
}

export const UserComponent = ({item}:IUserProps) => {
    return (
        <div>
            <h3>{item.id}. {item.firstName}</h3>
        </div>
    );
};