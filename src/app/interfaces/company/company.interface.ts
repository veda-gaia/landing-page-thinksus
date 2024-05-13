import { CompanyEmployeesEnum } from "src/app/enums/company-employees.enum";
import { CompanySectionEnum } from "src/app/enums/company-section.enum";
import { CompanySegmentEnum } from "src/app/enums/company-segment.enum";
import BaseInterface from "../base.interface";
import { UserInterface } from "../user/user.interface";

export default interface CompanyInterface extends BaseInterface {
  company: string;
  cnpj: string;
  companyAdress: CompanyAdress;
  segment: CompanySegmentEnum;
  section: CompanySectionEnum;
  numberEmployees: CompanyEmployeesEnum;
  revenue?: number;
  user: UserInterface;
}

interface CompanyAdress{
  country: string;
  state: string;
  city: string;
  zipCode?: string;
}
