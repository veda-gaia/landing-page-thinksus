
export interface UserUpdateRequestDto {
  name?: string;
  company?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
  phone?: string;
  /** Id da entidade (ADR-0033), nao mais codigo de enum. */
  section?: string;
}