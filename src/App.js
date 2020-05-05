import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Link, Route, Redirect, useLocation, useHistory, useParams } from "react-router-dom";

const useStateWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};

const App = () => {

  const [loggedIn, setLoggedIn] = useStateWithLocalStorage('loggedIn');

  return (
      <BrowserRouter>
        <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <Switch>
          <PrivateRoute loggedIn={loggedIn} path="/" exact>
            <Home/>
          </PrivateRoute>

          <PrivateRoute loggedIn={loggedIn} path="/channel/:id">
            <Channel/>
          </PrivateRoute>

          <PrivateRoute loggedIn={loggedIn} path="/section/:id">
            <Section/>
          </PrivateRoute>

          <Route path="/login">
            <Login setLoggedIn={setLoggedIn}/>
          </Route>

          <Redirect to='/' />

        </Switch>
      </BrowserRouter>
  )
}

const Login = ({setLoggedIn}) => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const login = () => {
    setLoggedIn('true');
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
      <h3>Home</h3>
    </div>
  );
};

const Channel = () => {
  const {id} = useParams();

  return(
    <div>
      <h3>Channel {id || "No id"}</h3>
    </div>
  );
};

const Section = () => {
  const {id} = useParams();

  return(
    <div>
      <h3>Section {id || "No id"}</h3>
    </div>
  );
};

const Nav = ({loggedIn, setLoggedIn}) => {
  console.log('Nav:', loggedIn);
  console.log('Nav:', typeof(loggedIn));

  const logout = () => {
    setLoggedIn('false');
  }
  if (loggedIn === 'true') {
    return (
      <nav>
        <Link to='/'>Home</Link>
        <Link to={{pathname: '/channel/1'}}>Channel 1</Link>
        <Link to={{pathname: '/section/2'}}>Section 2</Link>
        <button onClick={() => logout()}>Logout</button>
      </nav>
    );
  } else {
    return null;
  }
}

const PrivateRoute = ({ children, ...props }) => {
  console.log('PrivateRoute:', props.loggedIn);
  const loggedIn = props.loggedIn === 'true';
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

export {App}
