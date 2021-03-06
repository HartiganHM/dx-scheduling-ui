import React, { ReactChild, FC, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { HeaderMenu, SideNavigation } from '@f-design/component-library';

import { useStateValue } from 'components';
import { headerMenuOptions, sideNavigationMenuOptions } from 'shared/data';
import currentlyViewingByPathEnum from 'shared/enums/currentlyViewingByPathEnum';
import { ActionTypesEnum, CurrentlyViewing } from 'shared/types/types';
import './NavigationContainer.scss';

type NavigationContainerProps = {
  children: ReactChild | ReactChild[];
};

const NavigationContainer: FC<NavigationContainerProps> = ({
  children,
}: NavigationContainerProps) => {
  const history = useHistory();
  const location = useLocation();

  const [{ currentlyViewing }, dispatch] = useStateValue();

  useEffect(() => {
    const { pathname } = location;
    dispatch({
      type: ActionTypesEnum.UpdateCurrentlyViewing,
      currentlyViewing: {
        path: pathname,
        ...currentlyViewingByPathEnum[pathname],
      },
    });
  }, [location, dispatch]);

  return (
    <div className="dx-navigation-container">
      <SideNavigation
        logoTitle="DevelopmentalFX"
        logoAssetPath={`${process.env.PUBLIC_URL}/assets/dfx-1.png`}
        currentlyViewing={currentlyViewing}
        menuOptions={sideNavigationMenuOptions}
        onNavigate={(currentlyViewing: CurrentlyViewing): void =>
          history.push(currentlyViewing.path)
        }
        defaultSelected={{
          option: 'user',
          subOption: 'profile',
        }}
      />

      <div className="dx-navigation-container__content">
        <HeaderMenu
          currentlyViewing={currentlyViewing}
          menuOptions={headerMenuOptions}
          defaultTitle="Dashboard"
          onNavigate={(currentlyViewing: CurrentlyViewing): void =>
            history.push(currentlyViewing.path)
          }
        />
        <main className="dx-navigation-container__main">{children}</main>
      </div>
    </div>
  );
};

export default NavigationContainer;
