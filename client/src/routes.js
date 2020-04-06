import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import UserPage from './UserPage/UserPage';
import UserDetails from './UserPage/UserDetails';
import UserTrucks from './UserPage/UserTrucks';
import Welcome from './Main/Welcome/Welcome';
import Login from './Main/Login/Login';
import Registration from './Main/Registration/Registration';
import {UserContext} from './context/UserContext';
import {useTrucks} from './hooks/trucks.hook';

export const useRoutes = isAuthenticated => {
  const {trucksData, setTrucks, addOneTruck, deleteOneTruck, switchAssignTruck } = useTrucks();

  if(isAuthenticated){
    return (
      <div className="container">
      <Switch>
        <UserContext.Provider value={{
          trucksData, setTrucks, addOneTruck, deleteOneTruck, switchAssignTruck
        }}>
        <Route path="/userpage" exact>
          <UserPage/>
        </Route>
        <Route path="/user_details">
          <UserDetails/>
        </Route>
        <Route path="/user_trucks">
          <UserTrucks/>
        </Route>
        </UserContext.Provider>
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
