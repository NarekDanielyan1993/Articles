import React, { Component, Fragment } from 'react';
import {connect} from "react-redux";

import * as actions from "../../store/actions/index";

import Input from "../../components/Form/Input";
import Button from "../../components/UI/Button/Button";
import Loader from "../../components/UI/Loader/Loader";

import './singlePost.css';

class SinglePost extends Component {

   state = {
       comment: ""    
   }

    componentDidMount() {
        const postId = this.props.match.params.id;
        this.props.onViewSinglePost(postId)
        this.props.history.push(`/${postId}`);
    }

    inputChangeHandler = (value) => {
        this.setState({comment: value})
    }
  
    addCommentHandler = () => {
        this.setState(prevState => {
            const comment = prevState.comment;
            this.props.onAddComment(comment)
        })
        
    }


  render() {
    return (
        <Fragment>
            <section className="single-post">
            <h2>
                Created by {this.props.displayedPost.author ? this.props.displayedPost.author : ""}
            </h2>
                <h1>{this.props.displayedPost.title}</h1>
                <p>{this.props.displayedPost.body ? this.props.displayedPost.body : ""}</p>
                {this.props.postsLoading 
                    ? 
                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                          <Loader />
                        </div>
                    : 
                        <div className="leave-comment">
                           <form>
                                <Input
                                    id="content"
                                    label="comment"
                                    control="textarea"
                                    rows="5"
                                    onChange={(e) => this.inputChangeHandler(e.target.value)}
                                />
                           </form>
                           <Button mode="raised" design="accent" onClick={this.addCommentHandler}>Add comment</Button>
                        </div>
                }
                <div className="single-post__comments">
                    {
                        this.props.displayedPost.comments ? 
                        this.props.displayedPost.comments.map(comment => (
                            <p key={comment.id} className="comment__text">{comment.body}</p>
                        )) : ""
                    }
                </div>
            </section>
        </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        displayedPost: state.post.displayedPost,
        postsLoading: state.post.loading
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
        onViewSinglePost: (postId) => dispatch(actions.viewSinglePost(postId)),
        onAddComment: () => dispatch(actions.addComment())
    }
} 

 export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
