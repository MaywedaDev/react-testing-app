import React, { useState } from 'react';
import LogIn from './pages/Login/LogIn';
import Game from './pages/Game/Game';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  const [user, setUser] = useState('The Unknown')
  return (
    <div className="App min-vh-100">

      <Router>

        <Switch>

        <Route exact path='/'>
          <LogIn initUser={setUser}/>
        </Route>

        <Route exact path='/game'>
          <Game user={user}/>
        </Route>

        </Switch>

      </Router>
      
    </div>
  );
}

export default App;
