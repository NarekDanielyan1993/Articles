import React from "react";

import Button from "../../UI/Button/Button";
import "./post.css";

const post = props => (
    <article className="post">
        <header className="post__header">
            <h1 className="post__title">{props.title}</h1>
        </header>
        <div className="post__content">
        <p>{props.content}</p></div>
        <div className="post__actions">
            <Button mode="flat" link={props.id}>
                View
            </Button>
            <Button mode="flat" onClick={props.onStartEdit}>
                Edit
            </Button>
            <Button mode="flat" design="danger" onClick={props.onDelete}>
                Delete
            </Button>
        </div>
    </article>
);

export default post;