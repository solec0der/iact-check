export interface MenuItem {
  displayValue: string;
  routerLink: string;
  icon?: string;
  isSubMenuItem: boolean;
  rolesNeededToAccess: string[];
}
