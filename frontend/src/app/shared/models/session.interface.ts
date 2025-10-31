import { INote } from "./notes.interface";
import { IProcess } from "./process.interface";

export interface ISession {
  id: string;
  date: Date;
  session_number: number;
  is_grow: boolean;
  duration_minutes: number;
  location: string;
  goal?: string;
  process?: IProcess;
  notes: INote[];
}
