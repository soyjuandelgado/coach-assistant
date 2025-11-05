export interface ITask {
  id: string;
  text: string;
  scheduled_at?: Date;
  commitment?: number;
  done: boolean;
}
