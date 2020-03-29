import React from 'react';
import './App.css';
import {useAuth} from './hooks/auth.hook';
import {useRoutes} from './routes';
import {AuthContext} from './context/auth.context';

function App() {
  const {token, login, logout, userId} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <div className="App">
        <div className="container">
          {routes}
        </div>
      </div>
    </AuthContext.Provider>
  )
}

export default App;
