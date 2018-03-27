import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';
import '../Styles/App.css';
import {Header} from "./Header";
import {Main} from './Main';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
    state = {
        isLoggedIn : false,
    }
    handleLogin =()=>{

    }
    render() {
    return (
      <div className="App">
        <Header/>
        <Main isLoggedIn = {this.state.isLoggedIn} handleLogin = {this.handleLogin}/>
      </div>
    );
  }
}

export default App;
