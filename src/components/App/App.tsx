import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import client from '../../configuration/client';
import logo from '../../logo.svg';
import './App.css';

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
  </ApolloProvider>
);

export default App;
