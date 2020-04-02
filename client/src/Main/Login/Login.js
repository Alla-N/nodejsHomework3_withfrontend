import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {useHttp} from '../../hooks/http.hook';
import {useMessage} from '../../hooks/message.hook';
import {AuthContext} from '../../context/AuthContext';

function Login () {
  const auth = useContext(AuthContext) ;
  const message = useMessage();
  const {loading, request} = useHttp();

  const [form, setForm] = useState({
    email: '', password: ''
  });

  const loginHandler = async (e) => {
    e.preventDefault();
    try{
      const data  = await request('/api/login', 'POST',{...form});
      auth.login(data.token, data.responseUser);
    }catch(e){
      message(e.message);
    }
  };

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  };

  return (
      <div className="login">
        <Link to ="/" className="button__close">✖</Link>
        <h1 className="form__title">Login</h1>
        <form className="login__form form" onSubmit={loginHandler}>
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
              type="password"
              name="password"
              autoComplete='true'
              placeholder="Password"
              required
              onChange={changeHandler}
            />
          </p>
          <p className="form__p submit">
            <input
              className="form__submit"
              type="submit"
              name="commit"
              value="Login"
              disabled={loading}
            />
          </p>
        </form>
        <div className="login__help help">
          <p className="help__p">Forgot your password?
            <Link to ="/reset" className="help__link">Click here to reset it</Link>
          </p>
          <p className="help__p">Don't have an account?
            <Link to ="/registration" className="help__link">Click here to sign up</Link>
          </p>
        </div>
      </div>
  )
}

export default Login;
