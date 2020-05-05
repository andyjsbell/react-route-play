import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Redirect, useLocation, useHistory } from "react-router-dom";

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};

const Router = () => {

  const [loggedIn, setLoggedIn] = useStateWithLocalStorage('loggedIn');

  return (
      <BrowserRouter>

        <PrivateRoute loggedIn={loggedIn} path="/" exact>
          <Home/>
        </PrivateRoute>

        <PrivateRoute loggedIn={loggedIn} path="/page1">
          <Page1/>
        </PrivateRoute>

        <PrivateRoute loggedIn={loggedIn} path="/page2">
          <Page2/>
        </PrivateRoute>

        <Route path="/login">
          <Login setLoggedIn={setLoggedIn}/>
        </Route>

      </BrowserRouter>
  )
}

const Login = ({setLoggedIn}) => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const login = () => {
    setLoggedIn(true);
    history.replace(from);
  };

  return (
    <div>
      <button onClick={() => login()}>Login</button>
    </div>
  )
};

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

const PrivateRoute = ({ children, ...props }) => {
  console.log('PrivateRoute:', props.loggedIn);
  const loggedIn = props.loggedIn;
  return (
        <Route
            {...props}
            render={({ location }) =>
                loggedIn ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export {Router}
