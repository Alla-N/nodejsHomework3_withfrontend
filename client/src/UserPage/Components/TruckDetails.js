import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../../context/UserContext';
import {useHttp} from '../../hooks/http.hook';
import {useMessage} from '../../hooks/message.hook';
import {AuthContext} from '../../context/AuthContext';

const TruckDetails = (props) => {
  const id = props.match.params.id;
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const [truck] = user.trucksData.filter(item=> item._id === id);
  const {loading, request} = useHttp();
  const message = useMessage();
  const [form, setForm] = useState({
    userId: auth.userData.id,
    id: truck._id,
    model: truck.model,
    width: truck.dimensions.width,
    height: truck.dimensions.height,
    length: truck.dimensions.length,
    payload: truck.payload,
  });


  const changeHandler = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try{
      console.log(form);
      const data  = await request('/api/truck', 'PATCH',{...form});
      message(data.message);
      user.editOneTruck(data.truck._id, data.truck);

    }catch(e){
      message(e.message);
    }
  };

  return (
    <div className="user">
      <Link to ="/user_trucks" className="button__close">✖</Link>
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
            defaultValue={truck.model}
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
            defaultValue={truck.dimensions.width}
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
            defaultValue={truck.dimensions.height}
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
            defaultValue={truck.dimensions.length}
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
            defaultValue={truck.payload}
            onChange={changeHandler}
          />
        </p>
        <p className="form__p submit">
          <input
            className="form__submit"
            type="submit"
            value = "Change truck"
            disabled={loading}
          />
        </p>
      </form>
    </div>
  )
};

export default TruckDetails
