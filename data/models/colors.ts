export interface Color {
  primaryColor: string;
  code: string;
  imageSwatch: string;
  ditzlerPpgCode: string;
  duluxCode: string;
  name: string;
  shortCode: string;
  years: string;
  id: string;
  hasSwatch: boolean;
  images?: ColorImages[];
}

export interface ColorImages {
  url: string;
  contributor: string;
}
