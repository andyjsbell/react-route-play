import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Link, Route, Redirect, useLocation, useHistory, useParams } from "react-router-dom";

const useStateWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(localStorageKey))
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

const App = () => {

  const [credentials, setCredentials] = useStateWithLocalStorage('credentials');

  return (
      <BrowserRouter>
        <Nav credentials={credentials} setCredentials={setCredentials}/>
        <Switch>
          <PrivateRoute credentials={credentials} path="/" exact>
            <Home/>
          </PrivateRoute>

          <PrivateRoute credentials={credentials} path="/channel/:id">
            <Channel/>
          </PrivateRoute>

          <PrivateRoute credentials={credentials} path="/section/:id">
            <Section/>
          </PrivateRoute>

          <Route path="/login">
            <Login setCredentials={setCredentials}/>
          </Route>

          <Redirect to='/' />

        </Switch>
      </BrowserRouter>
  )
}

const Login = ({setCredentials}) => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const login = () => {
    setCredentials({token:'hello'});
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

const Nav = ({credentials, setCredentials}) => {

  const logout = () => {
    setCredentials(null);
  }
  if (credentials && credentials.token !== '') {
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
  const loggedIn = props.credentials && props.credentials.token !== '';
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
