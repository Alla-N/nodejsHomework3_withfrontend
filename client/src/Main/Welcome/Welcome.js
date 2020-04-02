import React from 'react';
import {Link} from 'react-router-dom';


function Welcome () {

  return(
    <div className="welcome">
      <h1 className="welcome__title">Welcome</h1>
      <div className="welcome__block">
        <Link to ="/login" className="welcome__link">Login</Link>
      </div>
      <div className="welcome__block">
        <Link to ="/registration" className="welcome__link">Registration</Link>
      </div>
    </div>
  )
}

export default Welcome;
