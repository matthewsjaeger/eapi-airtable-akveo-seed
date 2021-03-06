import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  
  {
    title: 'Ionic',
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
    title: 'Login',
    icon: 'shield-outline',
    link: '/auth/login',
    hidden: false,
    expanded: false,
  },
];
