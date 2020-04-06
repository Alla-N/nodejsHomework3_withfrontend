import React, {useContext, useEffect} from 'react';

import Driver from './Driver';
import Shipper from './Shipper';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';

function UserPage () {
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const {request} = useHttp();
  const message = useMessage();
  const {role} = auth.userData;

  useEffect(()=>{
    request(
      `/api/truck/${auth.userData.id}`,
      'GET',
      null)
      .then(response=>{
        user.setTrucks(response.trucks);
      })
      .catch((e)=>{
        message(e)
      });

  },[]);

  if(role === 'driver'){
    return(
      <Driver/>
    )
  }else if (role === 'shipper'){
    return(
      <Shipper/>
    )
  }else{
    return(
      <div className="user">
        <div className="user__nav nav">
          <ul className="nav__list">
            <li className="nav__item" onClick={()=>{auth.logout()}}>
              <img src={require("../image/exit.png")} alt="exit"/>
            </li>
          </ul>
        </div>
        <p>User not found</p>
      </div>
    )
  }

}

export default UserPage;
