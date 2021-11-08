import {Theme} from "../model/theme";

export interface CustomerBrandingDTO {
  id: number;
  customerId: number;
  primaryColour: string;
  backgroundColour: string;
  accentColour: string;
  textColour: string;
  font: string;
  theme: Theme;
}
