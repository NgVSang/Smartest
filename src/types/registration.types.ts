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

export interface IRegisGroup {
  date: string;
  list_registration: IRegistration[];
}
