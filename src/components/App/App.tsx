import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import client from '../../configuration/client';
import Routes from '../Routes/Routes';
import './App.css';

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

export default App;
