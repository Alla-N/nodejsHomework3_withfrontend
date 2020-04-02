import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';


function Driver () {
  const auth = useContext(AuthContext);
  const {logout} = auth;

  const [userState, setUserState] = useState({
    state: 'Inactive',
    state_action: 'Choose truck',
    hasOrder: true,
  },[]);

  const [orderState, setOrderState] = useState({
    name: 'Alla',
    phone: '+380964979967',
    status: 'Pick up',
    address: 'address 1',
    order_action: 'Pick up'
  },[]);


  return(
    <div className="user">
    <div className="user__nav nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link to='/user/details'><img src={require("../image/user.png")} alt="user"/></Link>
        </li>
        <li className="nav__item">
            <Link to='/user/trucks'><img src={require("../image/truck.png")} alt="truck"/></Link>
        </li>
        <li className="nav__item" onClick={logout}>
          <Link to='/'><img src={require("../image/exit.png")} alt="exit"/></Link>
        </li>
      </ul>
    </div>
      <div className="user__status">
        <h2 className="user__title">State</h2>
        <span className="user__state">{userState.state}</span>
        <button className="user__button">{userState.state_action}</button>
      </div>
      {userState.hasOrder?
        (<div className="user__order order">
          <h2 className="user__title">Order</h2>
          <p className="order__name">Shipper name: {orderState.name}</p>
          <p className="order__phone">Shipper contact: {orderState.phone}</p>
          <p className="order__address">
            {orderState.status} address: {orderState.address}
          </p>
          <p className="order__p">
            <button className="order__button">{orderState.order_action}</button>
          </p>
          <div className="order__map">google map</div>
        </div>): null
      }
    </div>
  )
}

export default Driver;

