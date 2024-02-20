import { Request, Response } from 'express';

export interface IAuthController {
  login: (req: Request, res: Response) => void;
  register: (req: Request, res: Response) => void;
}

export type P_RegisterPayload = {
  username: string;
  email: string;
  password: string;
  token: string;
};

export type P_LoginPayload = {
  email: string;
  password: string;
};

export interface IUser {
  user_id: number
  username: string
  email: string
  password: string
  role: string
}

export interface IAuthModel<T, PR = P_RegisterPayload, PL = P_LoginPayload> {
  login: (payload: PL) => Promise<T>;
  register: (payload: PR) => Promise<T>;
}
