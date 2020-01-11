const headerMenuOptions = {
  settings: {
    icon: 'settings',
    path: '/settings',
    subOptions: [
      {
        icon: 'group',
        label: 'User Administration',
        path: '/administration',
        hasAccess: true,
      },
      {
        icon: 'vpn_key',
        label: 'Permissions',
        path: '/permissions',
        hasAccess: true,
      },
    ],
  },
};

const sideNavigationMenuOptions = {
  user: {
    icon: 'account_circle',
    titleType: 'subOption',
    subOptions: ['profile', 'calendar', 'settings'],
  },
  client: {
    icon: 'people',
    titleType: 'subOption option',
    subOptions: ['intake'],
  },
};

export { headerMenuOptions, sideNavigationMenuOptions };
