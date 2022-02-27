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
    displayValue: 'SIDEBAR.LOGS',
    routerLink: 'logs',
    icon: 'monitor_heart',
    isSubMenuItem: false,
    rolesNeededToAccess: ['SUPERUSER'],
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
  {
    displayValue: 'SIDEBAR.SETTINGS',
    routerLink: 'customers/{customerId}/settings',
    icon: 'settings',
    isSubMenuItem: false,
    rolesNeededToAccess: ['ORGANIZATION_ADMINISTRATOR', 'SUPERUSER'],
  },
  {
    displayValue: 'SIDEBAR.GENERAL',
    routerLink: 'customers/{customerId}/settings/general',
    isSubMenuItem: true,
    rolesNeededToAccess: ['ORGANIZATION_ADMINISTRATOR', 'SUPERUSER'],
  },
  {
    displayValue: 'SIDEBAR.EMAIL',
    routerLink: 'customers/{customerId}/settings/email',
    isSubMenuItem: true,
    rolesNeededToAccess: ['ORGANIZATION_ADMINISTRATOR', 'SUPERUSER'],
  },
  {
    displayValue: 'SIDEBAR.TEXT',
    routerLink: 'customers/{customerId}/settings/text',
    isSubMenuItem: true,
    rolesNeededToAccess: ['ORGANIZATION_ADMINISTRATOR', 'SUPERUSER'],
  },
];
