import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';


function Shipper () {
  const {request} = useHttp();
  const message = useMessage();
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const {userData, logout} = auth;

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


  useEffect(()=>{
    request(
      `/api/load/${auth.userData.id}`,
      'GET',
      null)
      .then(response=>{
        user.setLoads(response.loads);
      })
      .catch((e)=>{
        message(e)
      });

  },[]);

  return(
    <div className="user">
      <div className="user__nav nav">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to='/user_details'><img src={require("../image/user.png")} alt="user"/></Link>
          </li>
          <li className="nav__item">
            <Link to='/user_loads'><img src={require("../image/box.png")} alt="truck"/></Link>
          </li>
          <li className="nav__item" onClick={logout}>
            <Link to='/'><img src={require("../image/exit.png")} alt="exit"/></Link>
          </li>
        </ul>
      </div>
      <div className="user__status">
        <h2 className="user__title">My status</h2>
        <span className="user__state">{userData.status}</span>
      </div>
      {userState.hasOrder?
        (<div className="user__order order">
          <h2 className="user__title">My order</h2>
          <p className="order__name">Shipper name: {orderState.name}</p>
          <p className="order__phone">Shipper contact: {orderState.phone}</p>
          <p className="order__address">
            {orderState.status} address: {orderState.address}
          </p>
          <p className="order__p">
            <button  className="user__button">{orderState.order_action}</button>
          </p>
          <div className="order__map">google map</div>
        </div>): null
      }
    </div>
  )
}

export default Shipper;

