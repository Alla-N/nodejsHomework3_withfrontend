import {useState, useCallback, useEffect} from 'react';

export const useAuth = () => {
  const[token, setToken] = useState(null);
  const [userData, setUserData] = useState({
    id:'',
    username:'',
    role:'',
  });

  const login = useCallback((jwtToken, user)=> {
    localStorage.setItem('userAuthData', JSON.stringify({user: user, token: jwtToken}));

    setUserData({
      id:user.id,
      username:user.username,
      role:user.role,
    });

    setToken(jwtToken);

  },[]);

  const logout = useCallback(()=> {
    setToken(null);
    setUserData({
      id:'',
      username:'',
      role:'',
    });

    localStorage.removeItem('userAuthData');
  },[]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userAuthData'));

    if (data && data.token){
      login(data.token, data.user)
    }

  },[login]);


  return{login, logout, token,userData}

};
