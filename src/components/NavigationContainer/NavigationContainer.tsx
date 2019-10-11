import React, { ReactChild } from 'react';
import { History } from 'history';

import './NavigationContainer.scss';

type NavigationContainerProps = {
  history: History;
  children: ReactChild | ReactChild[];
};

const NavigationContainer = ({ history, children }: NavigationContainerProps) => {
  console.log({ history });
  return (
    <div>
      {children}
    </div>
  );
};

export default NavigationContainer;
