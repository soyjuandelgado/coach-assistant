export interface IProcess {
  id?: string;
  type: string;
  duration_minutes: number;
  is_grow: boolean;
  goal?: string;
  start_date?: Date;
  end_date?: Date;
  frequency_days?: number;
  observations?: string;
  session_price?: number;
  payment_method?: string;
  payment_term_days?: number;
  contract_signed?: boolean;
  lodp_signed?: boolean;
  rgpd_signed?: boolean;
}
