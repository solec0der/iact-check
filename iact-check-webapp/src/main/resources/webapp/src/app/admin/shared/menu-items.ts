import { MenuItem } from './menu-item';

export const MENU_ITEMS: MenuItem[] = [
  {
    displayValue: 'SIDEBAR.CUSTOMERS',
    routerLink: 'customers',
    icon: 'corporate_fare',
    isSubMenuItem: false,
    rolesNeededToAccess: ['ORGANIZATION_ADMINISTRATOR', 'SUPERUSER'],
  },
  {
    displayValue: 'SIDEBAR.SETTINGS',
    routerLink: 'settings',
    icon: 'settings',
    isSubMenuItem: false,
    rolesNeededToAccess: ['ORGANIZATION_ADMINISTRATOR', 'SUPERUSER'],
  },
  {
    displayValue: 'SIDEBAR.LANGUAGE',
    routerLink: 'settings/language',
    isSubMenuItem: true,
    rolesNeededToAccess: ['ORGANIZATION_ADMINISTRATOR', 'SUPERUSER'],
  },
];
