export interface IProcessDto {
  type: string;
  duration_minutes: number;
  is_grow: boolean;
  goal?: string;
  start_date?: string | null;
  end_date?: string | null;
  frequency_days?: number | null;
  observations?: string;
  session_price?: number | null;
  payment_method?: string;
  payment_term_days?: number | null;
  contract_signed: boolean;
  lodp_signed: boolean;
  rgpd_signed: boolean;
}
