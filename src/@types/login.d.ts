export type LoginProps = {
  userName: string;
  password: number;
};

interface LoginResponse {
  token: string;
  userId: string;
}
export interface ApiResponse {
  data: LoginResponse;
}
