import { Pipe, PipeTransform } from '@angular/core';
import { CompanyRevenueEnum } from '../enums/company-revenue.enum';

@Pipe({ name: 'companyRevenue' })
export class CompanyRevenuePipe implements PipeTransform {
  transform(value: CompanyRevenueEnum): string {
    switch (value) {
      case CompanyRevenueEnum.under_360k:
        return 'REGISTER.BRL_INVOICING_1';
      case CompanyRevenueEnum.between_360k_4_8M:
        return 'REGISTER.BRL_INVOICING_2';
      case CompanyRevenueEnum.between_4_8M_20M:
        return 'REGISTER.BRL_INVOICING_3';
      case CompanyRevenueEnum.above_20M:
        return 'REGISTER.BRL_INVOICING_4';
      default:
        return '';
    }
  }
}
