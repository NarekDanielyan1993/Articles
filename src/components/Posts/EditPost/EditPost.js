import React, { Component, Fragment } from 'react';

import Button from "../../UI/Button/Button";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Modal from "../../UI/Modal/Modal";
import Input from "../../Form/Input";

import "./editPost.css";

const POST_FORM = {
    title: {
      value: '',
      valid: false,
      touched: false             
    },                                                   
    content: {
      value: '',
      valid: false,
      touched: false
    }
};

export default class EditPost extends Component {

    state = {
        postForm: POST_FORM,
        formIsValid: false,
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.selectedPost)
        if (
            !this.props.isModalClosed &&
            prevProps.isModalClosed !== this.props.isModalClosed && this.props.selectedPost
        ) {
            const postForm = {
              title: {
                ...prevState.postForm.title,
                value: this.props.selectedPost.title,
                valid: true
              },
              content: {
                ...prevState.postForm.content,
                value: this.props.selectedPost.body,
                valid: true
              }
            };
            this.setState({ postForm: postForm, formIsValid: true });
        }
    }

    cancelPostChangeHandler = () => {
        this.setState({
            postForm: POST_FORM,
            formIsValid: false
        })
        this.props.onCancelAddEdit();
    };
    
    acceptPostChangeHandler = () => {
        const post = {
            title: this.state.postForm.title.value,
            body: this.state.postForm.content.value
        };
        this.props.addPost(post);
        this.setState({
            postForm: POST_FORM,
            formIsValid: false,
        });
        this.props.onCancelAddEdit();
    };

    checkValidity = (field, value) => {
        if(field === "title") {
            return value.length > 3;
        }
        if(field === "content") {
            return value.length > 2;
        }
    }

    postInputChangeHandler = (value, field) => {
        this.setState(prevState => {
            let formIsValid = true;
            const postForm = prevState.postForm;
            const isValid = this.checkValidity(field, value)
            postForm[field].valid = isValid;
            postForm[field].value = value;
            postForm[field].touched = true;
            for(let field in postForm) {
                if(!postForm[field].valid) {
                  formIsValid = false;
                }
            }
            return {
                postForm: postForm,
                formIsValid: formIsValid
            }
        })
    }

    render() {
          return (
                <Fragment>
                    <div style={{textAlign: "center"}}>
                        <Button mode="raised" design="accent" onClick={this.props.newPost}>
                            NEW POST
                        </Button>
                    </div>
                    {!this.props.isModalClosed ? 
                    <div>
                        <Backdrop onClick={this.cancelPostChangeHandler} />
                        <Modal
                            title="New Post"
                            acceptEnabled={this.state.formIsValid}
                            onCancelModal={this.cancelPostChangeHandler}
                            onAcceptModal={this.acceptPostChangeHandler}
                            isLoading={this.props.loading}
                        >
                            <form>
                                <Input
                                    id="title"
                                    label="Title"
                                    control="input"
                                    onChange={(e) => this.postInputChangeHandler(e.target.value, "title")}
                                    valid={this.state.postForm['title'].valid}
                                    touched={this.state.postForm['title'].touched}
                                    value={this.state.postForm['title'].value}
                                />
                                <span className="errorMessage">{this.state.postForm['title'].touched
                                                                && !this.state.postForm['title'].valid ?
                                    "Entered name length should be greater than 4 characters" 
                                    : null}
                                </span>
                                <Input
                                    id="content"
                                    label="Content"
                                    control="textarea"
                                    rows="5"
                                    onChange={(e) => this.postInputChangeHandler(e.target.value, "content")}
                                    valid={this.state.postForm['content'].valid}
                                    touched={this.state.postForm['content'].touched}
                                    value={this.state.postForm['content'].value}
                                />
                                <span className="errorMessage">{this.state.postForm['content'].touched 
                                                                && !this.state.postForm['content'].valid ?
                                    "Content should be at least 3 characters long" 
                                    : null}
                                </span>
                            </form>
                        </Modal>
                    </div> : null}
              </Fragment>
          )
    }
}
