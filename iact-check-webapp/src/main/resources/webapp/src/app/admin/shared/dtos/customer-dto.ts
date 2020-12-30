export interface CustomerDTO {
  id?: number;
  name: string;
  primaryColour: string;
  backgroundColour: string;
  accentColour: string;
  textColour: string;
  font: string;
  usersWithAccess: string[];
}
