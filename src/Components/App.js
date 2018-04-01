import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';
import '../Styles/App.css';
import {Header} from "./Header";
import {Main} from './Main';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {TOKEN_KEY} from '../constants.js';
class App extends Component {
    state = {
        isLoggedIn : !!localStorage.getItem(TOKEN_KEY),
    }
    handleLogin =(response)=>{
        localStorage.setItem(TOKEN_KEY, response);
        this.setState({isLoggedIn : true});
    }
    handleLogout = ()=>{
        localStorage.removeItem(TOKEN_KEY);
        this.setState({isLoggedIn : false});
    }
    render() {
    return (
      <div className="App">
        <Header isLoggedIn = {this.state.isLoggedIn} handleLogout = {this.handleLogout}/>
        <Main isLoggedIn = {this.state.isLoggedIn} handleLogin = {this.handleLogin}/>
      </div>
    );
  }
}

export default App;
