export interface IProcess {
  id?: string;
  type: string;
  duration_minutes: number;
  is_grow: boolean;
  goal?: string;
}
