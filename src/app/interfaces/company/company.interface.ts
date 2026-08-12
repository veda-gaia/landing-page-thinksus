import { CompanyEmployeesEnum } from 'src/app/enums/company-employees.enum';
import BaseInterface from '../base.interface';
import { UserInterface } from '../user/user.interface';
import { CompanyRevenueEnum } from 'src/app/enums/company-revenue.enum';

export default interface CompanyInterface extends BaseInterface {
  company: string;
  cnpj: string;
  companyAdress: CompanyAdress;
  segment: any;
  section: any;
  numberEmployees: CompanyEmployeesEnum;
  revenue?: CompanyRevenueEnum;
  user: UserInterface;
  buyValue: Number;
  isSupplier: boolean;
}

interface CompanyAdress {
  country: string;
  state: string;
  city: string;
  zipCode?: string;
}
