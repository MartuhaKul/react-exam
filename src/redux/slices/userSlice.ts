import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAllUsers} from "../../services/api.service.ts";
import {IBaseResponseModel} from "../../models/IBaseResponseModel.ts";
import {IUser} from "../../models/user/IUser.ts";

type UserSliceType = {
    users: IUser[];
    loading: boolean;
    error: string | null;
};

const loadUsers = createAsyncThunk<IUser[],{page:string}>(
    "loadUsers",
    async ({page}, thunkAPI) => {
        try {
            const response:IBaseResponseModel<IUser[]> = await getAllUsers('/users', page);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (e) {
            console.error(e);
            return thunkAPI.rejectWithValue('error');
        }
    }
);

const initUserSliceState: UserSliceType = {
    users: [],
    loading: false,
    error: null
};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: initUserSliceState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(loadUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const userActions = { ...userSlice.actions, loadUsers };
