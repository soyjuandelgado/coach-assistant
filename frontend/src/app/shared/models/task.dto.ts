export interface ITaskDto {
  text: string;
  scheduled_at?: string | null;
  commitment?: number | null;
  done: boolean;
}
