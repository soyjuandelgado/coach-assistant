export interface IProcessDto {
  type: string;
  duration_minutes: number;
  is_grow: boolean;
  goal?: string;
  start_date?: string | null;
  end_date?: string | null;
  frequency_days?: number;
  observations?: string;
  session_price?: number;
  payment_method?: string;
  payment_term_days?: number;
  contract_signed?: boolean;
  lodp_signed?: boolean;
  rgpd_signed?: boolean;
}
