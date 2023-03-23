export interface SignInCredentials {
  username: string;
  password: string;
}

export interface SignUpCredentials {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

export interface Auth {
  access_token: string;
  expires_in: string;
  message: string;
  status: boolean;
  userId: string;
  username: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullname: string;
}
