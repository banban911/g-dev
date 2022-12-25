import axios from "axios"
import {PostType} from "../../pages/posts/dashboard";

const getPosts = async (params?: any) => {
    const {limit} = params
	const result  = await axios.get(`https://dummyjson.com/posts?limit=${limit || 10}`)
	if (result.data && result.data.posts){
		const posts = result.data.posts as PostType[]
        return posts
    }
}

export const PostApi = {
    getPosts
}