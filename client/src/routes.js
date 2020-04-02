import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import UserPage from './UserPage/UserPage';
import UserDetails from './UserPage/UserDetails';
import Welcome from './Main/Welcome/Welcome';
import Login from './Main/Login/Login';
import Registration from './Main/Registration/Registration';

export const useRoutes = isAuthenticated => {

  if(isAuthenticated){
    return (
      <div className="container">
      <Switch>
        <Route path="/userpage" exact>
          <UserPage/>
        </Route>
        <Route path="/user_details">
          <UserDetails/>
        </Route>
      </Switch>
      <Redirect to="/userpage" />
      </div>
    )
  }

  return (
    <div className="container">
    <Switch>
      <Route path="/" exact>
        <Welcome/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/registration">
        <Registration/>
      </Route>
      <Redirect to="/"/>
    </Switch>
    </div>
  )
};
