import {UsersComponent} from "../components/users-components/UsersComponent.tsx";
import {PaginationComponent} from "../components/pagination/PaginationComponent.tsx";

export const UsersPage = () => {
    return (
        <>
            <UsersComponent/>
            <PaginationComponent/>
        </>
    );
};