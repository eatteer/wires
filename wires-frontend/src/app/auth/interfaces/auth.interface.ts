export interface SignInCredentials {
  username: string;
  password: string;
}

export interface Auth {
  access_token: string;
  expires_in: string;
  message: string;
  status: boolean;
}
