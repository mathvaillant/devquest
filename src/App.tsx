import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';

import AuthContextProvider from './contexts/AuthContext';
import Room from './pages/Room';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/rooms/new' exact component={NewRoom} />
          <Route path='/rooms/:id' component={Room} />
        </Switch>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
