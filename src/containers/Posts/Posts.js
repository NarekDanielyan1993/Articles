import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

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
        this.props.onFetchPosts();
    }
    
    startEditPostHandler = postId => {
        this.props.onGetSinglePost(postId);
    }

    deletePostHandler = () => {
        
    }

    newPostHandler = () => {
        this.props.onOpenModal();    
    }

    cancelEditHandler = () => {
        this.props.onCloseModal();
    }

    render() {
        return (
            <Fragment>
                <section className="edit-control">
                    <EditPost 
                        onCancelAddEdit={this.cancelEditHandler} 
                        isModalClosed={this.props.isModalClosed} 
                        selectedPost={this.props.selectedPost} 
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
                    {this.props.posts.length <= 0 && !this.props.postsLoading ? 
                        <p style={{ textAlign: 'center' }}>No posts found.</p>
                        : null}
                    {this.props.posts.length > 0 && !this.props.postsLoading ? this.props.posts.map(post => {
                        return <Post
                            key={post.id}
                            id={String(post.id)}
                            title={post.title ? post.title : ""}
                            content={post.body ? post.body : ""}
                            onStartEdit={() => this.startEditPostHandler(post.id)}
                            onDelete={() => this.deletePostHandler(post.id)}
                        />;
                    }) : null}
                </section>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        postsLoading: state.post.loading,
        posts: state.post.posts,
        selectedPost: state.post.singlePost,
        isModalClosed: state.post.isModalClosed
    };
}; 

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchPosts: () => dispatch(actions.getPosts()),
        onCreatePost: () => dispatch(actions.createPost()),
        onGetSinglePost: (postId) => dispatch(actions.getSinglePost(postId)),
        onCloseModal: () => dispatch(actions.closeModal()),
        onOpenModal: () => dispatch(actions.openModal())
    };
}; 

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
