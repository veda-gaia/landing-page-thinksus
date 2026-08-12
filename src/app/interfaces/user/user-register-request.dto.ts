import { CompanyEmployeesEnum } from 'src/app/enums/company-employees.enum';
import { CompanyRevenueEnum } from 'src/app/enums/company-revenue.enum';

export interface UserRegisterRequestDto {
  user: UserRegisterDto;
  company: CompanyRegisterDto;
  lang: string;
}

interface UserRegisterDto {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  positionRole: string;
}

interface CompanyRegisterDto {
  company: string;
  cnpj: string;
  companyAdress: CompanyAdressRegisterRequestDto;
  segment: string;
  section: string;
  numberEmployees: CompanyEmployeesEnum;
  revenue?: CompanyRevenueEnum;
}

interface CompanyAdressRegisterRequestDto {
  country: string;
  state: string;
  city: string;
  zipCode?: string;
}
