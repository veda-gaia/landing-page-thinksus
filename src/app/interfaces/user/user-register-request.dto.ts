import { CompanyEmployeesEnum } from 'src/app/enums/company-employees.enum';
import { CompanyRevenueEnum } from 'src/app/enums/company-revenue.enum';
import { CompanySectionEnum } from 'src/app/enums/company-section.enum';
import { CompanySegmentEnum } from 'src/app/enums/company-segment.enum';

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
  segment: CompanySegmentEnum;
  section: CompanySectionEnum;
  numberEmployees: CompanyEmployeesEnum;
  revenue?: CompanyRevenueEnum;
}

interface CompanyAdressRegisterRequestDto {
  country: string;
  state: string;
  city: string;
  zipCode?: string;
}
