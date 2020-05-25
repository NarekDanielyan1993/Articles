import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';

import { Route, Switch, withRouter, Redirect } from "react-router-dom";

//COMPONENTS
import Posts from "./containers/Posts/Posts.js";
import SinglePost from "./containers/SinglePost/SinglePost";

import "./app.css";

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" exact component={Posts} />
                    <Route path="/:id" exact component={SinglePost} />
                    <Redirect to="/" />
                </Switch> 
            </div>
        );
    }
}

export default hot(withRouter(App));


