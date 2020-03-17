import React, { Component, Fragment } from 'react';
import {connect} from "react-redux";

import EditPost from "../../components/Posts/EditPost/EditPost";
import Post from "../../components/Posts/Post/Post";
import Loader from "../../components/UI/Loader/Loader";

import * as actions from "../../store/actions/index";

import "./posts.css";

class Posts extends Component {

    state = {
        isEditing: false,
        posts: [],
        editPost: null,
        postsLoading: true,
        editLoading: false
    };

    componentDidMount() {
        console.log(this.props.posts);
        this.props.onFetchPosts()
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.post && this.props.post !== prevProps.post) {
            this.setState({
                isEditing: true,
                editPost: this.props.post
            })
        }
    }

    startEditPostHandler = postId => {
        this.props.onGetSinglePost(postId)
    }

    deletePostHandler = postId => {
        
    }

    newPostHandler = () => {
        this.setState({isEditing: true})
    }

    cancelEditHandler = () => {
        this.setState({ isEditing: false, editPost: null });
    }

    render() {
        return (
            <Fragment>
                <section className="edit-control">
                        <EditPost 
                            onCancelEdit={this.cancelEditHandler} 
                            editing={this.state.isEditing} 
                            selectedPost={this.state.editPost} 
                            newPost={this.newPostHandler}
                            addPost={this.props.onCreatePost}
                        />
                </section>
                <section className="posts-list">
                    {this.props.postsLoading ? 
                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                          <Loader />
                        </div>
                    : null}
                    {this.props.posts.length <= 0 && !this.props.postsLoading ? (
                      <p style={{ textAlign: 'center' }}>No posts found.</p>
                    ) : null}
                    {this.props.posts.length > 0 ? this.props.posts.map(post => {
                        return ( <Post
                            key={post.id}
                            id={String(post.id)}
                            title={post.title ? post.title : ""}
                            content={post.body ? post.body : ""}
                            onStartEdit={() => this.startEditPostHandler(post.id)}
                            onDelete={() => this.deletePostHandler(post.id)}
                        />
                    )}) : null}
                </section>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        postsLoading: state.post.loading,
        posts: state.post.posts,
        post: state.post.singlePost
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchPosts: () => dispatch(actions.getPosts()),
        onCreatePost: () => dispatch(actions.createPost()),
        onGetSinglePost: (postId) => dispatch(actions.getSinglePost(postId))
    }
} 

 export default connect(mapStateToProps, mapDispatchToProps)(Posts);
