export interface IWheelsData {
  uuid: string;
  name: string;
  type: string;
  width: string;
  size: string;
  offset: string;
  notes: string;
  userName: string;
  emailAddress: string;
  referral: string;
  images?: any[];
  newWheel?: boolean;
  manufacturer?: string;
  boltPattern?: string;
  centerBore?: string;
  weight?: string | number;
}
export interface IWheelsDataReviewItem {
  uuid: string;
  name: string;
  type: string;
  width: string;
  size: string;
  offset: string;
  notes: string;
  userName: string;
  emailAddress: string;
  referral: string;
  images?: any[];
  newWheel?: boolean;
  oldWheel?: IWheelsData;
}

export interface IWheelToReview {
  new?: IWheelsData;
  existing?: IWheelsData;
}
