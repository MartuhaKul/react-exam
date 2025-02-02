import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {useEffect} from "react";
import {userActions} from "../../redux/slices/userSlice.ts";
import {UserComponent} from "./UserComponent.tsx";
import {useSearchParams} from "react-router-dom";
import {SearchBarComponent} from "../searchbar-component/SearchBarComponent.tsx";

export const UsersComponent = () => {
    const dispatch = useAppDispatch();

    const users = useAppSelector((state) => state.userStoreSlice.users) || [];
    const loading = useAppSelector((state) => state.userStoreSlice.loading);
    const error = useAppSelector((state) => state.userStoreSlice.error);

    const [query] = useSearchParams();
    const page:string = query.get("page") || '1';

    useEffect(() => {
        dispatch(userActions.loadUsers({page}));
    }, [dispatch, page]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading users: {error}</div>;

    return (
        <div>
            <SearchBarComponent/>
            {users.map((user) => (
                <UserComponent item={user} key={user.id} />
            ))}
        </div>
    );
};
