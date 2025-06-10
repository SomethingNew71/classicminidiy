export interface RegistryItem extends Record<string, any> {
  model: string;
  bodyNum: string;
  trim: string;
  submittedBy: string;
  submittedByEmail: string;
  engineNum: string;
  notes: string;
  year: number;
  uniqueId: string;
  buildDate: string | any[] | null;
  bodyType: string;
  engineSize: number;
  color: string;
  status?: RegistryItemStatus;
}

export interface RegistryQueueSubmissionResponse {
  uuid: string;
  details: RegistryItem;
}

export enum RegistryItemStatus {
  PENDING = 'P',
  APPROVED = 'A',
  REJECTED = 'R',
}
