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

export { headerMenuOptions, sideNavigationMenuOptions };
