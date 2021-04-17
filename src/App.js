import logo from './logo.svg';
import './App.css';
import { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Order from './components/Order/Order';
import Admin from './components/Admin/Admin';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Deal from './components/Deal/Deal';
import Login from './components/Login/Login';


export const UserContext = createContext();



function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <p>Name: {loggedInUser.name}</p>
    <Router>
        <Header />
        
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/Order">
            <Order/>
          </Route>
          <Route path="/Admin">
            <Admin />
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <PrivateRoute path="/admin/:userType">
           <Admin></Admin>
           </PrivateRoute>
          <Route path="/Deal">
            <Deal></Deal>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          
        </Switch>
      </Router>
      </UserContext.Provider>
   
  );
}

export default App;
