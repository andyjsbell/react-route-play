import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route } from "react-router-dom";

const Router = () => {
  return (
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/page1" component={Page1} />
        <Route path="/page2" exact component={Page2} />

      </BrowserRouter>
  )
}

const Home = () => {
    return(
        <div>
                <Nav/>
                <h3>Home</h3>
        </div>
    );
};

const Page1 = () => {
    return(
        <div>
            <Nav/>
            <h3>Page 1</h3>
        </div>
    );
};

const Page2 = () => {
    return(
        <div>
            <Nav/>
            <h3>Page 2</h3>
        </div>
    );
};

const Nav = () => {
  return (
      <nav>
          <Link to='/'>Home</Link>
          <Link to={{pathname: '/page1'}}>Page 1</Link>
          <Link to={{pathname: '/page2'}}>Page 2</Link>
      </nav>
  );
}

export {Router}
