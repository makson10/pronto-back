export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  okay: boolean;
}

export interface LogInData {
  email: string;
  password: string;
}

export interface LogInResponse {
  logined: boolean;
}

export interface QuickAccessUserData {
  id: number;
  firstName: string;
  email: string;
}

export type NewUserSession = {
  sessionId?: string;
  user?: {
    id: number;
    firstName: string;
    email: string;
  };
}
