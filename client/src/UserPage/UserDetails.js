import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {Link} from 'react-router-dom';

function UserDetails () {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {loading, request} = useHttp();


  const handleChangePassword = async (e) => {
    e.preventDefault();
    const pass1 = document.getElementById("pass1").value;
    const pass2 = document.getElementById("pass2").value;
    const currentPassword = document.getElementById("pass_current").value;

    if(pass1 === pass2){
      try{
        const response = await request('/api/change_password', 'PATCH',
          {newPassword: pass2, id: auth.userData.id, currentPassword},
          {"Authorization": auth.token});
        message(response.message);
        auth.logout();
      }catch (e){
        message(e.message);
      }
    }else{
      message('Passwords are not equal. Try again');
    }

  };
  return (
    <div className="user">
      <Link to ="/userpage" className="button__close">✖</Link>
      <div className="user__photo">
        <img className="user__img" src={require('../image/no-photo.png')} alt=""/>
      </div>
      <div className="user__name">
        <span className="user__span"> Username: </span> {auth.userData.username}
      </div>
      <div className="user__mail">
        <span className="user__span"> Email: </span> {auth.userData.email}
      </div>
      <div className="user__role">
        <span className="user__span"> Role: </span> {auth.userData.role}
      </div>
      <form className="user__form form" onSubmit={handleChangePassword}>
        <h3 className="form__title">Change my password</h3>
        <p className="form__p">
          <input
            className="form__input"
            type="password"
            id="pass_current"
            name="password"
            autoComplete='true'
            placeholder="Current password"
            required
          />
        </p>
        <p className="form__p">
          <input
            className="form__input"
            type="password"
            id="pass1"
            name="password"
            autoComplete='true'
            pattern="\d{6,}"
            placeholder="New password (at least 6 characters)"
            required
          />
        </p>
        <p className="form__p">
          <input
            className="form__input"
            type="password"
            id="pass2"
            name="password"
            autoComplete='true'
            pattern="\d{6,}"
            placeholder="Repeat password"
            required
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
    </div>
  )
}

export default UserDetails;
