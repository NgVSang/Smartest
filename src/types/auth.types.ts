export interface IUser {
  id: number;
  user_id_sso?: string;
  concurrency_stamp?: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  username?: string;
  delete_at?: string;
  isVerify: number;
  role_id: number;
  adress: string;
  status: number;
  have_notification: number;
  create_at: string;
  update_at?: string;
  role_name: string;
}

export type LoginResponse = {
  info: IUser;
  access_token: string;
};

export type LoginData = {
  phone_number: string;
  password: string;
  deviceToken?: string;
};
