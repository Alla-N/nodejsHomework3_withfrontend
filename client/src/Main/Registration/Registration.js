import React from 'react';
import {Link} from 'react-router-dom';

function Registration () {
  return (
      <div className="login">
        <Link to ="/" className="login__close">✖</Link>
        <h1 className="login__title">Registration</h1>
        <form className="login__form" method="POST" action="#">
          <p className="login__p">
            <input
              className="login__input"
              type="text"
              name="username"
              value=""
              placeholder="Full name"/>
          </p>
          <p className="login__p">
          <input
            className="login__input"
            type="email"
            name="login"
            value=""
            placeholder="Email"/>
          </p>
          <p className="login__p">
            <input
              className="login__input"
              type="text"
              name="login"
              value=""
              placeholder="Username"/>
          </p>
          <p className="login__p">
            <input
              className="login__input"
              type="password"
              name="password"
              value=""
              placeholder="Password"/>
          </p>
          <p className="login__p">
            <input
              className="login__input"
              type="password"
              name="password"
              value=""
              placeholder="Repeat password"/>
          </p>
          <div className="register-switch">
            <input type="radio" name="role" value="driver" id="driver"
                   className="register-switch-input" checked/>
              <label htmlFor="driver"
                     className="register-switch-label">Driver</label>
              <input type="radio" name="role" value="shipper" id="shipper"
                     className="register-switch-input"/>
                <label htmlFor="shipper"
                       className="register-switch-label">Shipper</label>
          </div>
          <p className="login__p submit">
            <input
              className="login__submit"
              type="submit" name="commit"
              value="Registration"/>
          </p>
        </form>
        <div className="login__help help">
          <p className="help__p">Have an account?
            <Link to ="/login" className="help__link">Click here to login</Link>
          </p>
        </div>
      </div>
  )
}

export default Registration;
