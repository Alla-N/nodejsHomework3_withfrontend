import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../../context/UserContext';
import {useHttp} from '../../hooks/http.hook';
import {useMessage} from '../../hooks/message.hook';
import {AuthContext} from '../../context/AuthContext';

const LoadDetails = (props) => {
  const id = props.match.params.id;
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const [load] = user.loadsData.filter(item=> item._id === id);
  const {loading, request} = useHttp();
  const message = useMessage();
  const [form, setForm] = useState({
    userId: auth.userData.id,
    id: load._id,
    name:load.name,
    width: load.dimensions.width,
    height: load.dimensions.height,
    length: load.dimensions.length,
    pickUpAddress: load.pickUpAddress,
    deliveryAddress: load.deliveryAddress,
  });


  const changeHandler = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try{
      const data  = await request('/api/load', 'PATCH',{...form});
      message(data.message);
      user.editOneLoad(data.load._id, data.load);

    }catch(e){
      message(e.message);
    }
  };

  return (
    <div className="user">
      <Link to ="/user_loads" className="button__close">✖</Link>
      <form className="user__form form" onSubmit={handleSubmitForm}>
        <h3 className="form__title">Change load</h3>
        <p className="form__p">
          <input
            className="form__input"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            required
            defaultValue={load.name}
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
            defaultValue={load.dimensions.width}
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
            defaultValue={load.dimensions.height}
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
            defaultValue={load.dimensions.length}
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
            defaultValue={load.weight}
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
            defaultValue={load.pickUpAddress}
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
            defaultValue={load.deliveryAddress}
            onChange={changeHandler}
          />
        </p>
        <p className="form__p submit">
          <input
            className="form__submit"
            type="submit"
            value = "Change load"
            disabled={loading}
          />
        </p>
      </form>
    </div>
  )
};

export default LoadDetails
