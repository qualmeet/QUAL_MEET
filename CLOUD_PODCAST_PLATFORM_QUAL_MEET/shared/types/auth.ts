export interface UserDTO {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: UserDTO;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}
