import * as actionTypes from "../actions/actionTypes";

const initialState = {
    posts: [],
    loading: false,
    error: false,
    errorMessage: "",
    singlePost: "",
    displayedPost: ""
}

 const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: state.posts.concat(action.posts),
                loading: false
            }
        case actionTypes.FETCHED_POSTS_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.GET_POST_SUCCESS:
            return {
                ...state,
                singlePost: state.posts.find(p => p.id === action.id)
            }
        case actionTypes.LOADING_DATA:
            return {
                ...state,
                loading: action.load
            }
        case actionTypes.CREATE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.concat(action.post),
                loading: false
            }
        case actionTypes.DISPLAY_SINGLE_POST_SUCCESS:
            return {
                ...state,
                displayedPost: action.post
            }
        case actionTypes.ADD_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case actionTypes.ADD_COMMENT_FAILED:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;











    
