export interface ICoacheeDto {
  name: string;
  surname: string;
  middlename?: string;
  email?: string;
  address?: string;
  phone?: string;
  birthdate?: string | null;
  dni?: string;
  company?: string;
  company_role?: string;
  company_address?: string;
}
