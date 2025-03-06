import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  
  {
    title: 'Table Games / ATR New',
    icon: {icon:'table-game', pack:'custom'},
    link: '/effortless/bj-atr'
  },
  {
    title: 'On Floor',
    icon: {icon: 'on-floor', pack:'custom'},
    link: '/effortless/on-floor',
  },
  {
    title: 'Storage Slots',
    icon: {icon: 'storage-slot', pack: 'custom'},
    link: '/effortless/search-storage-slots',
  },
  //{
  //  title: 'Multi-Slot Actions',
  //  icon: 'folder-add',
  //  link: '/effortless/multi-select',
  //},
  {
    title: 'Slot Projects',
    icon: {icon: 'slot-projects', pack: 'custom'},
    link: '/effortless/slot-projects',
  },
  {
    title: 'Create Actions',
    icon: {icon: 'create-actions', pack: 'custom'},
    link: '/effortless/create-actions',
  },
  {
    title: 'CDI',
    icon: {icon: 'cloud-download', pack: 'custom'},
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
    icon: {icon: 'login', pack: 'custom'},
    link: '/auth/login',
    hidden: false,
    expanded: false,
  },
  // No longer in use according to the Figma
  // {
  //   title: 'Table Games / ATR Old',
  //   icon: 'home-outline',
  //   link: '/effortless/ionic',
  //   home: true,
  // },
  {
    title: 'Relicensing',
    icon: {icon: 'relicensing', pack: 'custom'},
    link: '/effortless/relicensing',
    home: true,
  },
];
