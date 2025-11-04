import {
  IconBadge2k,
  IconCategory2,
  IconDashboard,
  IconMoneybagHeart,
  IconReceipt2,
  IconReport,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react';

export const link = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Overview',
      url: '/overview',
      icon: IconDashboard,
    },
    {
      title: 'Groups',
      url: '/groups',
      icon: IconUsers,
    },
    {
      title: 'Transactions',
      url: '/transactions',
      icon: IconReceipt2,
    },
    {
      title: 'Reports',
      url: '/reports',
      icon: IconReport,
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '/settings',
      icon: IconSettings,
    },
  ],
  master: [
    {
      name: 'Accounts',
      url: '/accounts',
      icon: IconMoneybagHeart,
    },
    {
      name: 'Budgets',
      url: '#',
      icon: IconBadge2k,
    },
    {
      name: 'Categories',
      url: '/categories',
      icon: IconCategory2,
    },
  ],
};
