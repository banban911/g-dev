import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {AppState} from "./index";

export interface AuthState {
    authState: boolean,
}

// Initial state

const initialState: AuthState  = {
    authState: false,
}

// AuthSlice

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {

        // set authentication

		setAuthState(state, action){
            state.authState = action.payload
        },
    },
	// hydrating the state

	extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
				...action.payload.auth
            }
        }
    }
})

export const setAuthState = authSlice.actions.setAuthState
export const selectAuthState = (state: AppState) => state.auth.authState
export default authSlice.reducer



