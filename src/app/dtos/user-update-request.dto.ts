import { CompanySectionEnum } from "../enums/company-section.enum";

export interface UserUpdateRequestDto {
  name?: string;
  company?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
  phone?: string;
  section?: CompanySectionEnum;
}