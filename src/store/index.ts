import {configureStore, ThunkAction, Action, ThunkDispatch, AnyAction} from "@reduxjs/toolkit";
import {authSlice} from "./auth";
import {createWrapper} from "next-redux-wrapper";
import { postSlice } from "./posts";

const makeStore = () => configureStore({
	reducer: {
        [authSlice.name]: authSlice.reducer,
		[postSlice.name]: postSlice.reducer
    },
	devTools: true
})


export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore["getState"]>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>
export type RootState = ReturnType<typeof makeStore>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const wrapper = createWrapper<AppStore>(makeStore, {debug: true})