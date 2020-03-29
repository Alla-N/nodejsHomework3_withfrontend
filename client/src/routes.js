import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import UserPage from './UserPage/UserPage';
import Welcome from './Main/Welcome/Welcome';
import Login from './Main/Login/Login';
import Registration from './Main/Registration/Registration';
import Create from './Create/Create';

export const useRoutes = isAuthenticated => {

  if(isAuthenticated){
    return (
      <div>
      <Switch>
        <Route pats="/userpage" exact>
          <UserPage/>
        </Route>
        <Route pats="/create">
          <Create/>
        </Route>
      </Switch>
      <Redirect to="/userpage" />
      </div>
    )
  }

  return (
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
  )
};
