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

export interface LogOutResponse {
  okay: boolean;
}

export type Session = {
  sessionId?: string;
  userId?: number;
  expiresAt?: Date;
};

export type FullUser = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  createdAt: string;
  email: string;
  password: string;
};

export interface GetUserIdBySessionResponse {
    userId: number;
}
