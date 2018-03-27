import React from 'react';
import {Register} from './Register';
import {Login} from './Login';
import {Home} from './Home';
import { Switch, Route } from 'react-router';
export class Main extends React.Component{
    getLogin = () =>{
        return this.props.isLoggedIn?<Home/>:<Login handleLogin = {this.props.handleLogin}/>;
    }

    render(){
        return(
            <Switch>
                <Route exact path="/" render={this.getLogin}/>
                <Route path="/login" render={this.getLogin}/>
                <Route path="/register" component={Register}/>
                <Route component = {Login}/>
            </Switch>
        );
    }
}