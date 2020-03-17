import axios from "../../utilities/axiosInstance";

import * as actionTypes from "../actions/actionTypes";

export const loadData = () => {
    return dispatch => {
       dispatch({type: actionTypes.LOADING_DATA, load: true}) 
    }
}

const fetch_posts_success = (posts) => {
    return {
        type: actionTypes.FETCH_POSTS_SUCCESS,
        posts: posts
    }
}

const fetch_posts_failed = (error) => {
    return {
        type: actionTypes.FETCHED_POSTS_FAILURE,
        error: error
    }
}

const create_post_success = (post) => {
    return {
        type: actionTypes.CREATE_POST_SUCCESS,
        post: post
    }
}

const create_post_failed = (error) => {
    return {
        type: actionTypes.CREATE_POST_FAILED,
        error: error
    }
}

const get_post_success = (id) => {
    return {
        type: actionTypes.GET_POST_SUCCESS,
        id: id
    }
}

export const getPosts = () => {
    return dispatch => {
        dispatch(loadData());
        axios.get("posts")
        .then((response) => {
          console.log(response.data)
          dispatch(fetch_posts_success(response.data));
        })
        .catch((err) => {
          console.log(err.response)
          dispatch(fetch_posts_failed(err.response.data.errorMessage));
        });
    }   
}

export const createPost = (postData) => {
    return dispatch => {
        dispatch(loadData())
        axios({method: "post", url: "posts", data: postData, headers: {
            "Content-Type": "application/json"
            }
        })
        .then((response) => {
            console.log(response)
            dispatch(create_post_success(response.data))
        })
        .catch(err => {
            dispatch(create_post_failed(err.response.data.errorMessage))
        })
    }; 
}

export const getSinglePost = (postId) => {
    return dispatch => {
        console.log(postId)
        dispatch(get_post_success(postId))
    }
}