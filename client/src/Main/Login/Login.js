import React from 'react';
import {Link} from 'react-router-dom';

function Login () {
  return (
      <div className="login">
        <Link to ="/" className="login__close">✖</Link>
        <h1 className="login__title">Login</h1>
        <form className="login__form" method="POST" action="#">
          <p className="login__p">
            <input
              className="login__input"
              type="email"
              name="email"
              value=""
              placeholder="Email"/>
          </p>
          <p className="login__p">
            <input
              className="login__input"
              type="password"
              name="password"
              value=""
              placeholder="Password"/>
          </p>
          <p className="login__p submit">
            <input
              className="login__submit"
              type="submit" name="commit"
              value="Login"/>
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
