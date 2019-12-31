import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { IntakeForm, Permissions } from 'pages';
import NavigationContainer from '../NavigationContainer/NavigationContainer';

const Routes = () => (
  <Router>
    <Route
      path="/"
      render={() => (
        <NavigationContainer>
          <Switch>
            <Route path="/permissions" component={Permissions} />
            <Route path="/intake" component={IntakeForm} />
          </Switch>
        </NavigationContainer>
      )}
    />
  </Router>
);

export default Routes;
