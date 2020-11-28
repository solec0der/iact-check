import { MenuItem } from './menu-item';

export const MENU_ITEMS: MenuItem[] = [
  {
    displayValue: 'Kunden',
    routerLink: 'customers',
    icon: 'corporate_fare',
    isSubMenuItem: false,
    rolesNeededToAccess: ['SUPERUSER'],
  },
];
