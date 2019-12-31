import React, { ReactChild } from 'react';
import { useHistory } from 'react-router-dom';
import {
  HeaderMenu,
  SideNavigation,
} from '@f-design/component-library';

import './NavigationContainer.scss';

type NavigationContainerProps = {
  children: ReactChild | ReactChild[];
};

const NavigationContainer = ({ children }: NavigationContainerProps) => {
  const history = useHistory();

  const sideNavigationMenuOptions = {
    user: {
      icon: 'person',
      titleType: 'subOption option',
      subOptions: ['my info', 'notifications', 'logout'],
    },
    settings: {
      icon: 'settings_applications',
      titleType: 'subOption',
      subOptions: ['preferences', 'help', 'feedback'],
    },
  };

  const currentlyViewing = {
    path: '/user/my info',
    title: 'user',
  };

  console.log({ history });
  return (
    <div className="dx-navigation-container">
      <SideNavigation
        currentlyViewing={currentlyViewing}
        menuOptions={sideNavigationMenuOptions}
        defaultSelected={{
          option: 'user',
          subOption: 'my info',
        }}
      />

      <div className="dx-navigation-container__content">
        <HeaderMenu
          currentlyViewing={{
            title: 'Development FX',
            subTitle: 'Scheduling Application',
            path: '/best-site',
          }}
          menuOptions={{
            settings: {
              icon: 'settings',
              path: '/settings',
            },
            notifications: {
              icon: 'notifications',
              path: '/notifications',
            },
            search: {
              icon: 'search',
            },
          }}
          defaultTitle="Dashboard"
        />
        {children}
      </div>
    </div>
  );
};

export default NavigationContainer;
