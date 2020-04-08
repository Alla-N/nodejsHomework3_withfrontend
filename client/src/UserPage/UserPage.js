import React, {useContext, useEffect} from 'react';

import Driver from './Driver';
import Shipper from './Shipper';
import {AuthContext} from '../context/AuthContext';

function UserPage () {
  const auth = useContext(AuthContext);
  const {role} = auth.userData;



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
