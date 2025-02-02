import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./slices/userSlice.ts";
import {recipeSlice} from "./slices/recipeSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {authSlice} from "./slices/authSlice.ts";
import {userByIdSlice} from "./slices/userByIdSlice.ts";
import {recipeByIdSlice} from "./slices/recipeByIdSlice.ts";



export const store = configureStore({
    reducer: {
        userStoreSlice: userSlice.reducer,
        recipeStoreSlice: recipeSlice.reducer,
        authStoreSlice: authSlice.reducer,
        userByIdStoreSlice: userByIdSlice.reducer,
        recipeByIdStoreSlice: recipeByIdSlice.reducer,

    }
});


export const useAppDispatch=useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();