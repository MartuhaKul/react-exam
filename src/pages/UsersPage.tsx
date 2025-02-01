import {UsersComponent} from "../components/users-component/UsersComponent.tsx";
import {PaginationComponent} from "../components/pagination/PaginationComponent.tsx";

export const UsersPage = () => {
    return (
        <>
            <UsersComponent/>
            <PaginationComponent/>
        </>
    );
};