import React from 'react';
import './App.css';

import {useRoutes} from './routes';
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext';
import {BrowserRouter} from 'react-router-dom';


function App() {
  const {token, login, logout, userData} = useAuth();
  const isAuthentication = !!token;
  const routes = useRoutes(isAuthentication);

  return (
    <AuthContext.Provider value={{
      token, login, logout, userData, isAuthentication
    }}>
      <BrowserRouter>
        <div className="App">
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
