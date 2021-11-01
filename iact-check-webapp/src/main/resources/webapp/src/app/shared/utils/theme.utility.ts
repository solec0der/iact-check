import { Theme } from '../model/theme';

export class ThemeUtility {
  public static convertThemeToCssClass(theme: Theme): string {
    switch (theme) {
      case Theme.LIGHT:
        return 'light-theme';
      case Theme.DARK:
        return 'dark-theme';
    }
  }
}
