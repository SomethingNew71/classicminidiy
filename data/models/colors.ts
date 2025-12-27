export enum ColorItemStatus {
  PENDING = 'P',
  APPROVED = 'A',
  REJECTED = 'R',
}

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

export interface ColorQueueItem extends Color {
  submittedBy: string;
  submittedByEmail: string;
  status?: ColorItemStatus;
  originalColorId?: string;
}

export interface ColorQueueSubmissionResponse {
  uuid: string;
  details: ColorQueueItem;
}

export interface PrettyColor {
  pretty: {
    'Primary Color': string;
    Code: string;
    hasSwatch: boolean;
    'Ditzler PPG Code': string;
    'Dulux Code': string;
    Name: string;
    'Short Code': string;
    Years: string;
    ID: string;
  };
  raw: Color;
}

export interface ColorImages {
  url: string;
  contributor: string;
}
