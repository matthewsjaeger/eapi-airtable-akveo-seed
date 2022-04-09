import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  
  {
    title: 'BJ/ATR',
    icon: 'home-outline',
    link: '/effortless/ionic',
    home: true,
  },
  {
    title: 'Storage Slots',
    icon: 'person',
    link: '/effortless/storage-slots',
  },
  {
    title: 'Slot Projects',
    icon: 'person',
    link: '/effortless/slot-projects',
  },
  {
    title: 'On Floor',
    icon: 'play-circle',
    link: '/effortless/on-floor/:sid',
  },
  {
    title: 'Multi-Slot Actions',
    icon: 'folder-add',
    link: '/effortless/multi-select',
  },
  {
    title: 'CDI',
    icon: 'cloud-download',
    link: '/effortless/cdi',
  },
  {
    title: 'Login',
    icon: 'shield-outline',
    link: '/auth/login',
    hidden: false,
    expanded: false,
  },
];
