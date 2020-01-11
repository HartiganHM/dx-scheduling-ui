import React, { ReactElement, FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { IntakeForm, Permissions } from 'pages';
import NavigationContainer from '../NavigationContainer/NavigationContainer';

const Routes: FunctionComponent = () => (
  <Router>
    <Route
      path="/"
      render={(): ReactElement => (
        <NavigationContainer>
          <Switch>
            <Route path="/permissions" component={Permissions} />
            <Route path="/client/intake" component={IntakeForm} />
          </Switch>
        </NavigationContainer>
      )}
    />
  </Router>
);

export default Routes;
