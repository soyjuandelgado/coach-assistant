import { IUser } from "./user.interface";

export interface IRole {
  id: string;
  name: string;
  description: string;
  admin_access: boolean;
  coachees_access: boolean;
  users: IUser[];
}

