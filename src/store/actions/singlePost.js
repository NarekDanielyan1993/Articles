import * as actionsTypes from "./actionTypes";


import axios from "../../utilities/axiosInstance";

const dispay_single_post_success = (post) => {
    return {
        type: actionsTypes.DISPLAY_SINGLE_POST_SUCCESS,
        post: post
    }
}

export const viewSinglePost = (postId) => {
    return dispatch => {
        axios.get(`posts/${postId}?_embed=comments`)
        .then((response) => {
            console.log(response.data) 
            dispatch(dispay_single_post_success(response.data)) 
        })
        .catch((err) => {
          
        });
    }
}



const add_comment_success = () => {
    return {
        type: actionsTypes.ADD_COMMENT_SUCCESS
    }
}

export const loadData = () => {
    return dispatch => {
       dispatch({type: actionsTypes.LOADING_DATA, load: true}) 
    }
}

const add_comment_failed = (error) => {
    return {
        type: actionTypes.ADD_COMMENT_FAILED,
        error: error
    }
}

export const addComment = (comment, id) => {
    return dispatch => {
        dispatch(loadData());
        axios({method: "post", url: "comments", data: {postId: id, body: comment}})
        .then((response) => {
            console.log(response.data)
            dispatch(add_comment_success(response.data))
        })
        .catch(err => {
            dispatch(add_comment_failed(err.response.data.errorMessage))
        }) 
    }
}