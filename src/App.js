import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route } from "react-router-dom";

const Router = () => {
  return (
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
  )
}

const Home = () => {
    return(
        <h3>Home</h3>
    );
};

const Page1 = () => {
    return(
        <h3>Page1</h3>
    );
};

const Page2 = () => {
    return(
        <h3>Page2</h3>
    );
};

const App = () => {
  return (
      <nav>
          <Link to='/'>Home</Link>
          <Link to={{pathname: '/page1'}}>Page 1</Link>
          <Link to={{pathname: '/page2'}}>Page 2</Link>
      </nav>
  );
}

export {App, Router}
