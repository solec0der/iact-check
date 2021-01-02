import { MenuItem } from './menu-item';

export const GENERAL_MENU_ITEMS: MenuItem[] = [
  {
    displayValue: 'SIDEBAR.CUSTOMERS',
    routerLink: 'customers',
    icon: 'corporate_fare',
    isSubMenuItem: false,
    rolesNeededToAccess: ['ORGANIZATION_ADMINISTRATOR', 'SUPERUSER'],
  },
  {
    displayValue: 'SIDEBAR.CREATE_CUSTOMER',
    routerLink: 'customers/-1/create',
    isSubMenuItem: true,
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

export const CUSTOMER_MENU_ITEMS: MenuItem[] = [
  {
    displayValue: 'SIDEBAR.BACK_TO_OVERVIEW',
    routerLink: 'customers',
    icon: 'arrow_back',
    isSubMenuItem: false,
    rolesNeededToAccess: ['ORGANIZATION_ADMINISTRATOR', 'SUPERUSER'],
  },
  {
    displayValue: 'SIDEBAR.EDIT_CUSTOMER',
    routerLink: 'customers/{customerId}/edit',
    icon: 'edit',
    isSubMenuItem: false,
    rolesNeededToAccess: ['ORGANIZATION_ADMINISTRATOR', 'SUPERUSER'],
  },
  {
    displayValue: 'SIDEBAR.CUSTOMER_BRANDING',
    routerLink: 'customers/{customerId}/branding',
    icon: 'invert_colors',
    isSubMenuItem: false,
    rolesNeededToAccess: ['ORGANIZATION_ADMINISTRATOR', 'SUPERUSER'],
  },
  {
    displayValue: 'SIDEBAR.CHECKS',
    routerLink: 'customers/{customerId}/checks',
    icon: 'assignment_turned_in',
    isSubMenuItem: false,
    rolesNeededToAccess: ['ORGANIZATION_ADMINISTRATOR', 'SUPERUSER'],
  },
  {
    displayValue: 'SIDEBAR.CREATE_CHECK',
    routerLink: 'customers/{customerId}/checks/-1/create',
    isSubMenuItem: true,
    rolesNeededToAccess: ['ORGANIZATION_ADMINISTRATOR', 'SUPERUSER'],
  },
];
