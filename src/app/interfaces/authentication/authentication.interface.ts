export default interface AuthorizationInterface {
  email: string;
  name: string;
  id: string;
  token: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}