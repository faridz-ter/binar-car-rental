import { Request, Response } from 'express';

export type TParams = {
  search?: string;
  page?: number;
  size?: number;
};

export interface IRestModel<T> {
  list: (params?: TParams) => Promise<T[]>;
  create: (payload: P) => Promise<T>;
  show: (id: string) => Promise<T>;
  update: (id: string, payload: T) => Promise<T>;
  remove: (id: string) => Promise<T>;
}

export interface IRestController {
  list: (req: Request, res: Response) => void;
  create: (req: Request, res: Response, next: NextFunction) => void;
  show: (req: Request, res: Response) => void;
  update: (req: Request, res: Response, next: NextFunction) => void;
  remove: (req: Request, res: Response) => void;
}
