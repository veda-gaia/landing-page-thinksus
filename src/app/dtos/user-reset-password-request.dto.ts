export interface UserResetPasswordRequestDto {
  password: string;
  code: string;
  email: string;
}
