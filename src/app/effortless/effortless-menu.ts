import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Login',
    icon: 'shield-outline',
    link: '/auth/login',
    hidden: false,
    expanded: false,
  },
  {
    title: 'Facilities',
    icon: 'home-outline',
    link: '/usp/facilities',
  },
  {
    title: 'Inquiries',
    icon: 'phone-call',
    link: '/usp/inquiries',
    home: true,
  },
  {
    title: 'Clients',
    icon: 'person',
    link: '/usp/clients',
  },
  {
    title: 'Placements',
    icon: 'home',
    link: '/usp/placements',
  },
  {
    title: 'Referral Sources',
    icon: 'people',
    link: '/usp/referral-sources',
  },
  {
    title: 'Team Members',
    icon: 'people',
    link: '/usp/team-members',
  },
  {
    title: 'Configuration',
    icon: 'settings',
    children: [
      {
        title: 'Discovery Questions',
        link: '/usp/configuration/discovery-questions',
      },
      {
        title: 'Facility Types',
        link: '/usp/configuration/facility-types',
      },
      {
        title: 'Placement Stages',
        link: '/usp/configuration/placement-stages',
      },
      {
        title: 'Price Ranges',
        link: '/usp/configuration/price-ranges',
      },
      {
        title: 'Activities',
        pathMatch: 'prefix',
        link: '/usp/configuration/activities',
      },
      {
        title: 'ADLs',
        pathMatch: 'prefix',
        link: '/usp/configuration/adls',
      },
      {
        title: 'Cognitive Disabilities',
        pathMatch: 'prefix',
        link: '/usp/configuration/cognitive-disabilities',
      },
    ],
  },
];
