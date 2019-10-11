import React from 'react';
import {
  BrowserRouter as Router,
  // Switch,
  Route,
} from 'react-router-dom';

import NavigationContainer from '../NavigationContainer/NavigationContainer';

const Routes = () => (
  <Router>
    <Route
      path="/"
      render={({ history }) => (
        <NavigationContainer history={history}>
          <div className="App">
            <header className="App-header">
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        </NavigationContainer>
      )}
    />
  </Router>
);

export default Routes;
