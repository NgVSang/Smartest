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

export interface ICarDetail {
  id: number;
  license_plates: string;
  manufacture_at: number;
  type: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  display_images: {
    id: number;
    url: string;
  }[];
}

export interface IRequired {
  id: number;
  name: string;
  status: 1;
}
