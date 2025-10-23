import { IUser } from "./user.interface";

export interface ICoachee {
  id: string;
  name: string;
  surname: string;
  middlename?: string;
  email?: string;
  address?: string;
  phone?: string;
  birthdate?: Date;
  dni?: string;
  company?: string;
  company_role?: string;
  company_address?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  coach: IUser;
}
