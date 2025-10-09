export interface UserSupplierRegisterDto {
  companyId: string;
  name: string;
  email: string;
  cnpj: string;
  buyValue: number;
  active?: boolean;
}
