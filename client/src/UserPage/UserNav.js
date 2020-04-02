import React, {useContext} from 'react';
import {AuthContext} from '../context/auth.context';

function UserNav () {
  const {role} = useContext(AuthContext).userData;
  return (
    <div>

    </div>
  )
}

export default UserNav;
