export interface IRegistration {
  id: number;
  license_plate: string;
  registration_for?: string;
  status: number;
  type: string;
  display_image?: string;
  cost: string;
  date: string;
  completed_at?: string;
}

export interface IFee {
  tariff?: number;
  serviceCost?: number;
  road_fee?: number;
  license_fee?: number;
}

export interface IRegisGroup {
  date: string;
  list_registration: IRegistration[];
}

export interface IHistoryRegistry {
  id: number;
  date: string;
  license_plate: string;
  address?: string;
  payment_date?: string;
  plan_date?: string;
  url?: string;
}

export interface IRegistrationDetail {
  id: number;
  license_plate?: string;
  license_plates?: string;
  carId: number;
  date: string;
  registry_time?: string;
  address?: string;
  completedAt?: string;
  isPay: number;
  paymentAt?: string;
  planDate?: string;
  fee: IFee;
  staff?: any;
}
