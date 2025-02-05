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
}

export interface RegistryQueueSubmissionResponse {
  issueNumber: number;
  issueUrl: string;
  uuid: string;
  details: RegistryItem;
}
