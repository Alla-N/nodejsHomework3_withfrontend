import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useHttp} from '../../hooks/http.hook';
import {useMessage} from '../../hooks/message.hook';
import {AuthContext} from '../../context/auth.context';

function Login () {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {loading, error, request, clearError} = useHttp();
  const [form, setForm] = useState({
    email: '', password: ''
  });

  useEffect( ()=> {
    message(error);
    clearError();
  }, [clearError, error, message]);

  const loginHandler = async (e) => {
    e.preventDefault();
    try{
      const data  = await request('/api/login', 'POST',{...form});
      message(data.message);
      auth.login(data.token, data.id);
    }catch(e){
      message(e);
    }
  };

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  };

  return (
      <div className="login">
        <Link to ="/" className="login__close">✖</Link>
        <h1 className="login__title">Login</h1>
        <form className="login__form" onSubmit={loginHandler}>
            <p className="login__p">
              <input
              className="login__input"
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={changeHandler}
            />
          </p>
          <p className="login__p">
            <input
              className="login__input"
              type="password"
              name="password"
              autoComplete='true'
              placeholder="Password"
              required
              onChange={changeHandler}
            />
          </p>
          <p className="login__p submit">
            <input
              className="login__submit"
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
