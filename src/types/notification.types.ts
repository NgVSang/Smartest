import {IInfringe} from './car.types';

export interface INotice {
  id: number;
  type: number;
  content: string;
  is_read: number;
  data?: string;
  time: string;
}

export interface INoticeDetail {
  id: number;
  content: string;
  create_at: string;
  data: string;
  date: string;
  planDate?: string;
  registry_id?: number;
  type: number;
  errors?: IInfringe[];
  detail?: {
    id: number;
    address?: string;
    carImage?: string;
    car_delivery_time?: string;
    completed_at?: string;
    create_at: string;
    date?: string;
    date_birth?: string;
    delete_at?: string;
    id_card?: string;
    license_plate: string;
    owner_id: string;
    owner_name: string;
    owner_phone: string;
    pay_at?: string;
    payment_date?: string;
    phone_number?: string;
    plan_date?: string;
    registry_time?: string;
    staff_id?: string;
    staff_name?: string;
    status?: string;
    testing_center_id?: number;
    update_at?: string;
    vehicle_type_id: number;
  };
}
