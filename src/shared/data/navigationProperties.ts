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

const sideNavigationMenuOptions = [
  {
    label: 'user',
    icon: 'account_circle',
    titleType: 'subOption',
    subOptions: [
      {
        path: '/user/profile',
        title: 'Profile',
      },
      {
        path: '/user/calendar',
        title: 'Calendar',
      },
      {
        path: '/user/settings',
        title: 'Settings',
      },
    ],
  },
  {
    label: 'client',
    icon: 'people',
    titleType: 'subOption option',
    subOptions: [
      {
        path: '/client/intake',
        title: 'intake',
      },
    ],
  },
];

export { headerMenuOptions, sideNavigationMenuOptions };
