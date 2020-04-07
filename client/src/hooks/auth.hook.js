import {useState, useCallback, useEffect} from 'react';

export const useAuth = () => {
  const[token, setToken] = useState(null);
  const [userData, setUserData] = useState({
    id:'',
    username:'',
    email: '',
    role:'',
  });

  const login = useCallback((jwtToken, user)=> {
    localStorage.setItem('userAuthData', JSON.stringify({user: user, token: jwtToken}));

    setUserData(user);

    setToken(jwtToken);

  },[]);

  const logout = useCallback(()=> {
    setUserData({
      id:'',
      username:'',
      email:'',
      role:'',
    });

    setToken(null);

    localStorage.removeItem('userAuthData');
  },[]);


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userAuthData'));

    if (data && data.token){
      login(data.token, data.user)
    }

  },[login]);


  return{login, logout, userData, token}

};
