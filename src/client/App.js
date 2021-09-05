import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { WebSocketProvider } from '../client/context/socket.js';
import { Admin } from './pages/Admin.js';
import { Screen } from './pages/Screen.js';
import { User } from './pages/User.js';

export const App = () => {

  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <WebSocketProvider>
        <Switch>
          <Route exact path="/">
            <Screen index={0} />
          </Route>
          <Route exact path="/1">
            <Screen index={1} />
          </Route>
          <Route exact path="/2">
            <Screen index={2} />
          </Route>
          <Route exact path="/3">
            <Screen index={3} />
          </Route>
          <Route exact path="/4">
            <Screen index={4} />
          </Route>
          <Route exact path="/user">
            <User />
          </Route>
          <Route exact path="/admin">
            <Admin index={4} />
          </Route>
          <Route path="*">
            <div>找不到页面！</div>
          </Route>
        </Switch>
      </WebSocketProvider>
    </Router>
  );
}