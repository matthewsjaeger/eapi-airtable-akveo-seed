import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  
  {
    title: 'Table Games / ATR New',
    icon: 'home-outline',
    link: '/effortless/bj-atr',
  },
  {
    title: 'On Floor',
    icon: 'play-circle',
    link: '/effortless/on-floor',
  },
  {
    title: 'Storage Slots',
    icon: 'archive',
    link: '/effortless/search-storage-slots',
  },
  //{
  //  title: 'Multi-Slot Actions',
  //  icon: 'folder-add',
  //  link: '/effortless/multi-select',
  //},
  {
    title: 'Slot Projects',
    icon: 'layers',
    link: '/effortless/slot-projects',
  },
  {
    title: 'Create Actions',
    icon: 'plus-circle',
    link: '/effortless/create-actions',
  },
  {
    title: 'CDI',
    icon: 'cloud-download',
    children: [
      {
        title: 'Recent',
        link: '/effortless/cdi'
      },
      {
        title: 'Conflicted',
        link: '/effortless/cdi-conflicted'
      },
      {
        title: 'Manually Added',
        link: '/effortless/cdi-manual'
      },
      {
        title: 'Approval Letters',
        link: '/effortless/cdi-letter'
      }
    ]
  },
  {
    title: 'Login',
    icon: 'shield-outline',
    link: '/auth/login',
    hidden: false,
    expanded: false,
  },
  {
    title: 'Table Games / ATR Old',
    icon: 'home-outline',
    link: '/effortless/ionic',
    home: true,
  },
];
