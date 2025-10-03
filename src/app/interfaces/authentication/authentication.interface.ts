export default interface AuthorizationInterface {
  email: string;
  name: string;
  id: string;
  token: string;
  isSupplier?: boolean;
  isCompletedRegister: boolean;
}

export interface LoginInterface {
  email: string;
  password: string;
}
