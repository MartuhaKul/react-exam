import {useAppDispatch, useAppSelector} from "../../redux/store.ts";
import {useEffect} from "react";
import {userActions} from "../../redux/slices/userSlice.ts";
import {UserComponent} from "../user-component/UserComponent.tsx";
import {useSearchParams} from "react-router-dom";

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
            {users.map((user) => (
                <UserComponent item={user} key={user.id} />
            ))}
        </div>
    );
};
