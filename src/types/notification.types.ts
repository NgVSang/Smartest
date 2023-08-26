export interface INotice {
  id: number;
  type: number;
  content: string;
  is_read: number;
  data?: string;
  time: string;
}
