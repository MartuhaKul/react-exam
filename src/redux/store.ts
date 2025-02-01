import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./slices/userSlice.ts";
import {recipeSlice} from "./slices/recipeSlice.ts";
import {useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        userStoreSlice: userSlice.reducer,
        recipeStoreSlice: recipeSlice.reducer,

    }
});


export const useAppDispatch=useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();