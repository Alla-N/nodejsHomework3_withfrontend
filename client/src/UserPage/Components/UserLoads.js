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
import {createLoadsList} from '../../functions/createLoadsList';

function UserLoads() {
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
      const data  = await request('/api/load', 'POST',{...form});
      message(data.message);
      user.addOneLoad(data.load);
    }catch(e){
      message(e.message);
    }
  };

  const deleteLoad = async (e) => {
    try{
      const data  = await request(
        `/api/load/${auth.userData.id}`,
        'DELETE',
        {
          loadId: e.target.value
        });
      message(data.message);
      user.deleteOneLoad(e.target.value);

    }catch(e){
      message(e.message);
    }
  };

  const postLoad = async (e) => {
    try{
        const data  = await request(
          `/api/load/${auth.userData.id}`,
          'PUT',
          {
            loadId: e.target.value
          });
        message(data.message);
        user.changeLoadStatus(e.target.value);
    }catch(e){
      message(e.message);
    }
  };

  const editLoad = (e) => {
    let [load] = user.loadsData.filter(item=>item._id === e.target.value);
    if(load.status !== 'new'){
      alert ('You can not edit assigned load!');
    }else{
      history.push(`/load_details/${e.target.value}`);
    }
  };



  useEffect(()=>{
    createLoadsList(user.loadsData, deleteLoad, postLoad, editLoad)
  },[user.loadsData]);


  return (
    <div className="user">
      <Link to ="/userpage" className="button__close">✖</Link>
      <form className="user__form form" onSubmit={handleSubmitForm}>
        <h3 className="form__title">Create new load</h3>
        <p className="form__p">
          <input
            className="form__input"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
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
            id="weight"
            name="weight"
            placeholder="Weight, kg"
            required
            onChange={changeHandler}
          />
        </p>
        <p className="form__p">
          <input
            className="form__input"
            type="text"
            id="address1"
            name="pickUpAddress"
            placeholder="Pick up address"
            required
            onChange={changeHandler}
          />
        </p>
        <p className="form__p">
          <input
            className="form__input"
            type="text"
            id="address2"
            name="deliveryAddress"
            placeholder="Delivery address"
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
        <h1 className="list__title">My loads</h1>
        <ul className="list__ul" id="listUl">
        </ul>
      </div>
    </div>
  )
}

export default UserLoads;
