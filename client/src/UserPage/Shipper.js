import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';


function Shipper () {
  const auth = useContext(AuthContext);
  const {logout} = auth;

  return (
    <div className="user">
      <div className="user__nav nav">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to='/user/details'><img src={require("../image/user.png")} alt="user"/></Link>
          </li>
          <li className="nav__item">
            <Link to='/user/trucks'><img src={require("../image/box.png")} alt="box"/></Link>
          </li>
          <li className="nav__item" onClick={logout}>
            <Link to='/'><img src={require("../image/exit.png")} alt="exit"/></Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Shipper;
