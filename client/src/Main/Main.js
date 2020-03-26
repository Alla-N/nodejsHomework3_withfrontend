import React from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import Welcome from './Welcome/Welcome';

function Main () {
  return (
    <div className="Main">
      <Route exact path = '/' component = {Welcome}></Route>
      <Route exact path = '/login' component = {Login}></Route>
      <Route path = '/registration' component = {Registration}></Route>
    </div>
  )
}

export default Main;
