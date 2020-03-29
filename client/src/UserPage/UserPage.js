import React, {useContext} from 'react';
import {AuthContext} from '../context/auth.context';


function UserPage () {
  const auth = useContext(AuthContext);
  return (
    <div className="userPage">
      <h1>UserPage</h1>
      <button onClick={auth.logout}>Logout</button>
    </div>
)
}

export default UserPage;
