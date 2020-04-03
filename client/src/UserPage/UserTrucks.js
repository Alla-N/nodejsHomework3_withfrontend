import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import {Link} from 'react-router-dom';
import {useMessage} from '../hooks/message.hook';
import {useHttp} from '../hooks/http.hook';

function UserTrucks () {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {loading, request} = useHttp();

  const [form, setForm] = useState({
    userId: auth.userData.id,
    model: '',
    width: '',
    height: '',
    length: '',
    payload: '',
  });

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try{
      const data  = await request('/api/truck', 'POST',{...form});
      message(data);
    }catch(e){
      message(e.message);
    }
  };

  const deleteTruck = (e) => {
    console.log(e.target);
  };

  const assignTruck = (e) => {
    console.log(e.target);
  };

  const createTruckList = (array) => {
    const ul = document.getElementById('trucks');
    const fragment = document.createDocumentFragment();
    array.forEach(e=>{
      const deleteButton = document.createElement('BUTTON');
      deleteButton.className = 'trucks-list__delete';
      deleteButton.addEventListener('click', deleteTruck);
      deleteButton.innerText = 'Delete';
      deleteButton.value = e._id;

      const assignButton = document.createElement('BUTTON');
      assignButton.className = 'trucks-list__assign';
      assignButton.addEventListener('click', assignTruck);
      assignButton.innerText = 'Assign';
      assignButton.value = e._id;

      let li = document.createElement('LI');
      li.innerHTML = `${e.model}: ` ;
      li.appendChild(deleteButton);
      li.appendChild(assignButton);
      li.id = e._id;
      fragment.appendChild(li);
    });

    ul.appendChild(fragment);
  };

  useEffect(()=>{
    request(
      `/api/truck/${auth.userData.id}`,
      'GET',
      null)
    .then(response=>{
      createTruckList(response.trucks);
    })
      .catch((e)=>{
        message(e)
      });

  },[]);

  return (
    <div className="user">
      <Link to ="/userpage" className="button__close">✖</Link>
      <form className="user__form form" onSubmit={handleChangePassword}>
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
      <ul className="truck-list" id="trucks">

      </ul>
    </div>
  )
}

export default UserTrucks;
