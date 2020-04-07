import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import UserPage from './UserPage/UserPage';
import UserDetails from './UserPage/Components/UserDetails';
import UserTrucks from './UserPage/Components/UserTrucks';
import UserLoads from './UserPage/Components/UserLoads';
import TruckDetails from './UserPage/Components/TruckDetails';
import LoadDetails from './UserPage/Components/LoadDetails';
import Welcome from './Main/Welcome/Welcome';
import Login from './Main/Login/Login';
import Registration from './Main/Registration/Registration';
import {UserContext} from './context/UserContext';
import {useTrucks} from './hooks/trucks.hook';
import {useLoads} from './hooks/loads.hook';



export const useRoutes = isAuthenticated => {
  const {trucksData,
    setTrucks,
    addOneTruck,
    deleteOneTruck,
    editOneTruck,
    switchAssignTruck } = useTrucks();

  const {
    loadsData,
    setLoads,
    addOneLoad,
    deleteOneLoad,
    editOneLoad,
    changeLoadStatus} = useLoads();

  if(isAuthenticated){
    return (
      <div className="container">
      <Switch>
        <UserContext.Provider value={{
          trucksData,
          setTrucks,
          addOneTruck,
          deleteOneTruck,
          editOneTruck,
          switchAssignTruck,
          loadsData,
          setLoads,
          addOneLoad,
          deleteOneLoad,
          changeLoadStatus,
          editOneLoad,
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
          <Route path="/user_loads">
            <UserLoads/>
          </Route>
          <Route path="/truck_details/:id" render={(props)=>(
            <TruckDetails {...props}/>
          )}>
          </Route>
          <Route path="/load_details/:id" render={(props)=>(
            <LoadDetails {...props}/>
          )}>
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
