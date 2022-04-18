import { Injectable } from '@angular/core';
import * as tinycolor from 'tinycolor2';
import { Color } from '../model/color';
import { Theme } from '../model/theme';
import { ThemeUtility } from '../utils/theme.utility';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}

  private readonly defaultPrimaryColor = '#0f87c9';
  private readonly defaultAccentColor = '#424e59';

  public setColors(primaryColour: string, accentColour: string, theme: Theme): void {
    this.updateTheme(this.computeColors(primaryColour), 'primary');
    this.updateTheme(this.computeColors(accentColour), 'accent');

    document.body.classList.remove(
      ThemeUtility.convertThemeToCssClass(Theme.LIGHT),
      ThemeUtility.convertThemeToCssClass(Theme.DARK)
    );

    document.body.classList.add(ThemeUtility.convertThemeToCssClass(theme));
  }

  public setDefaultTheme(): void {
    this.setColors(this.defaultAccentColor, this.defaultPrimaryColor, Theme.LIGHT);
  }

  private updateTheme(colors: Color[], theme: string): void {
    colors.forEach((color) => {
      document.documentElement.style.setProperty(`--theme-${theme}-${color.name}`, color.hex);
      document.documentElement.style.setProperty(
        `--theme-${theme}-contrast-${color.name}`,
        color.darkContrast ? 'rgba(black, 0.87)' : 'white'
      );
    });
  }

  private computeColors(hex: string): Color[] {
    return [
      this.getColorObject(tinycolor(hex).lighten(52).toHexString(), '50'),
      this.getColorObject(tinycolor(hex).lighten(37).toHexString(), '100'),
      this.getColorObject(tinycolor(hex).lighten(26).toHexString(), '200'),
      this.getColorObject(tinycolor(hex).lighten(12).toHexString(), '300'),
      this.getColorObject(tinycolor(hex).lighten(6).toHexString(), '400'),
      this.getColorObject(tinycolor(hex).toHexString(), '500'),
      this.getColorObject(tinycolor(hex).darken(6).toHexString(), '600'),
      this.getColorObject(tinycolor(hex).darken(12).toHexString(), '700'),
      this.getColorObject(tinycolor(hex).darken(18).toHexString(), '800'),
      this.getColorObject(tinycolor(hex).darken(24).toHexString(), '900'),
      this.getColorObject(tinycolor(hex).lighten(50).saturate(30).toHexString(), 'A100'),
      this.getColorObject(tinycolor(hex).lighten(30).saturate(30).toHexString(), 'A200'),
      this.getColorObject(tinycolor(hex).lighten(10).saturate(15).toHexString(), 'A400'),
      this.getColorObject(tinycolor(hex).lighten(5).saturate(5).toHexString(), 'A700'),
    ];
  }

  private getColorObject(value: string, name: string): Color {
    const c = tinycolor(value);
    return {
      name,
      hex: c.toHexString(),
      darkContrast: c.isLight(),
    };
  }
}
