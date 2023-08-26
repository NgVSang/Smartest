export interface ICar {
  id: number;
  type: string;
  license_plates: string;
  display_image?: string;
  date?: string;
  plan_date?: string;
}

export interface IInfringe {
  id: number;
  name: string;
  date: string;
  handlingAgency?: string;
}
