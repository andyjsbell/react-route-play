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
