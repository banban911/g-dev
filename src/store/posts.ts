import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {PostType} from "../../pages/posts/dashboard";
import {PostApi} from "../services/post.service";
import {AppState} from "./index";
import axios from "axios";

export interface PostsState {
    post: PostType[],
    loading: boolean,
    error: string | undefined
}

//api to fetch initial data
export const getPosts = (params: any) => createAsyncThunk(
    'post/getPosts',
    async (thunkAPI) => {
        const result = await axios.get(`https://dummyjson.com/posts?limit=${params.limit}`)
        if (result) {
            return result.data.posts
        }
    }
)

// Initial state

const initialState: PostsState = {
    post: [],
    loading: false,
    error: ''
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {

        // delete posts
        deletePost(state, action) {
            state.post = state.post.filter(p => p.id !== action.payload.id)
        },

        // edit post
        editPost(state, action) {
            const updatedPost = action.payload
            state.post = state.post.map((item) => {
                if (item.id === action.payload.id) {
                    return updatedPost
                }
                return item
            })
        },

        //create post
        createPost(state, action) {
            state.post.push(action.payload)
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                // Add posts to the state array
                state.loading = false
                state.post = action.payload
                state.error = ''
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading = false
                state.post = []
                state.error = action.error.message
            })
            .addCase(HYDRATE, (state, action) => {
                return {
                    ...state,
                }
            })
    }
})

export const createPost = postSlice.actions.createPost
export const deletePost = postSlice.actions.deletePost
export const editPost = postSlice.actions.editPost

export const selectPostState = (state: AppState) => state.post
export default postSlice.reducer
