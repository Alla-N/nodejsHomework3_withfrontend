import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { useHistory } from "react-router-dom";
import {AuthContext} from '../../context/AuthContext';
import {UserContext} from '../../context/UserContext';
import {Link} from 'react-router-dom';
import {useMessage} from '../../hooks/message.hook';
import {useHttp} from '../../hooks/http.hook';
import {createTruckList} from '../../functions/createTruckList';

function UserTrucks () {
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const message = useMessage();
  const {loading, request} = useHttp();
  let history = useHistory();

  const [form, setForm] = useState({
    userId: auth.userData.id
  });

  const changeHandler = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try{
      const data  = await request('/api/truck', 'POST',{...form});
      message(data.message);
      user.addOneTruck(data.truck);

    }catch(e){
      message(e.message);
    }
  };

  const deleteTruck = async (e) => {
    try{
      const data  = await request(
        `/api/truck/${auth.userData.id}`,
        'DELETE',
        {
          truckId: e.target.value
        });
      message(data.message);
      user.deleteOneTruck(e.target.value);

    }catch(e){
      message(e.message);
    }
  };

  const assignTruck = async (e) => {
    try{
      const [currentTruck] = user.trucksData.filter(item=>item.status === 'assigned');
      let currentTruckId = currentTruck ? currentTruck._id : null;

      if(currentTruck) {
        const data  = await request(
          `/api/truck_switch/${auth.userData.id}`,
          'PUT',
          {
            currentTruckId: currentTruckId ,
            nextTruckId: e.target.value
          });
        message(data.message);
        user.switchAssignTruck(currentTruck._id, e.target.value);
      }else{
        const data  = await request(
          `/api/truck_assign/${auth.userData.id}`,
          'PUT',
          {
            nextTruckId: e.target.value
          });
        message(data.message);
        user.switchAssignTruck(null, e.target.value);
      }

  }catch(e){
    message(e.message);
  }
  };

  const endWork = async (e) => {
    try{
      const [currentTruck] = user.trucksData.filter(item=>item.status === 'assigned');
      if(currentTruck){
        const data  = await request(
          `/api/truck_end/${auth.userData.id}`,
          'PUT',
          {
            currentTruckId: currentTruck._id,
          });
        message(data.message);
        user.switchAssignTruck(currentTruck._id, null);
      }else{
        message('You have no assigned truck')
      }

    }catch(e){
      message(e.message);
    }
  };

  const editTruck = (e) => {
    let [truck] = user.trucksData.filter(item=>item._id === e.target.value);
    if(truck.status === 'assigned'){
      alert ('You can not edit assigned truck!');
    }else{
      history.push(`/truck_details/${e.target.value}`);
    }
  };



  useEffect(()=>{
    createTruckList(user.trucksData, deleteTruck, assignTruck, editTruck)
  },[user.trucksData]);


  return (
    <div className="user">
      <Link to ="/userpage" className="button__close">✖</Link>
      <form className="user__form form" onSubmit={handleSubmitForm}>
        <h3 className="form__title">Create new truck</h3>
        <p className="form__p">
          <input
            className="form__input"
            type="text"
            id="model"
            name="model"
            placeholder="Car model"
            required
            onChange={changeHandler}
          />
        </p>
        <p className="form__p">
          <input
            className="form__input"
            type="number"
            id="width"
            name="width"
            placeholder="Width, sm"
            required
            onChange={changeHandler}
          />
        </p>
        <p className="form__p">
          <input
            className="form__input"
            type="number"
            id="height"
            name="height"
            placeholder="Height, sm"
            required
            onChange={changeHandler}
          />
        </p>
        <p className="form__p">
        <input
          className="form__input"
          type="number"
          id="length"
          name="length"
          placeholder="Length, sm"
          required
          onChange={changeHandler}
        />
      </p>
        <p className="form__p">
          <input
            className="form__input"
            type="number"
            id="payload"
            name="payload"
            placeholder="Payload, kg"
            required
            onChange={changeHandler}
          />
        </p>
        <p className="form__p submit">
          <input
            className="form__submit"
            type="submit"
            disabled={loading}
          />
        </p>
      </form>
      <div className="user__list list">
        <h1 className="list__title">My trucks</h1>
        <ul className="list__ul" id="listUl">
        </ul>
        <br/>
        <br/>
        <div className="user__end end">
          <button className="list__button end__button" onClick={endWork}>End work</button>
        </div>
      </div>
    </div>
  )
}

export default UserTrucks;
