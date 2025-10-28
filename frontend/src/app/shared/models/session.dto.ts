export interface ISessionDto {
  date: string;
  session_number: number;
  is_grow: boolean;
  duration_minutes: number;
  location: string;
  goal?: string | null;
}