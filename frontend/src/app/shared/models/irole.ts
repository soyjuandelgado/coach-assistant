import { IUser } from "./iuser";

export interface IRole {
  id: string;
  name: string;
  description: string;
  admin_access: boolean;
  coachees_access: boolean;
  users: IUser[];
}

