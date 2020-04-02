import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useHttp} from '../../hooks/http.hook';
import {useMessage} from '../../hooks/message.hook';

function Registration () {
  const message = useMessage();
  const {loading, error, request, clearError} = useHttp();
  const [form, setForm] = useState({
    email: '', password: '', username: '', role: ''
  });

  useEffect( ()=> {
    message(error);
    clearError();
  }, [clearError, error, message]);

  const registerHandler = async (e) => {
    e.preventDefault();
    try{
      const data  = await request('/api/registration', 'POST',{...form});
      message(data.message);
      window.location.assign('/login')
    }catch(e){
      console.log(e);
    }
  };

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  };

  return (
      <div className="login">
        <Link to="/" className="button__close">✖</Link>
        <h1 className="form__title">Registration</h1>
        <form className="login__form form" onSubmit={registerHandler}>
          <p className="form__p">
            <input
              className="form__input"
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={changeHandler}
            />
          </p>
          <p className="form__p">
            <input
              className="form__input"
              type="text"
              name="username"
              placeholder="Username"
              required
              onChange={changeHandler}
            />
          </p>
          <p className="form__p">
            <input
              className="form__input"
              type="password"
              name="password"
              autoComplete='true'
              placeholder="Password (at least 6 characters)"
              required
              onChange={changeHandler}
            />
          </p>
          <h4 className="register__title">Select account type</h4>
          <div className="register-switch">
            <input type="radio"
                   name="role"
                   value="driver"
                   id="driver"
                   className="register-switch__input"
                   required
                   onChange={changeHandler}
            />
            <label htmlFor="driver"
                   className="register-switch__label">
              Driver
            </label>
            <input type="radio"
                   name="role"
                   value="shipper"
                   id="shipper"
                   className="register-switch__input"
                   onChange={changeHandler}
            />
            <label htmlFor="shipper"
                   className="register-switch__label">
              Shipper
            </label>
          </div>
          <p className="form__p submit">
            <input
              className="form__submit"
              type="submit"
              name="commit"
              value="Registration"
              disabled={loading}
            />
          </p>
        </form>
        <div className="login__help help">
          <p className="help__p">Have an account?
            <Link to="/login" className="help__link">Click here to login</Link>
          </p>
        </div>
      </div>
    )
}

export default Registration;
