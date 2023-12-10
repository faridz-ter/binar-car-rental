import { Request, Response, NextFunction } from 'express';
import ServiceAuth from '../services/ServiceAuth';
import RepoUsers from '../repositories/RepositoryAuth';
import { IUsers } from '../models/Users';

export interface IRequestWithAuth extends Request {
  user?: IUsers;
}

const repoUser = new RepoUsers();
const serviceAuth = new ServiceAuth(repoUser);
class Auth {
  constructor() { }
  authorize(req: Request, res: Response, next: NextFunction) {
    next();
  }
  async authorizeSuperAdmin(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;

    if (!headers.authorization) {
      return res.status(403).json({
        data: 'not authorized',
      });
    }
    
    const bearerToken = `${headers.authorization}`;
    const userData = await serviceAuth.validateToken(bearerToken);
    const isSuperAdmin = await serviceAuth.validateRole(userData, 'superadmin');

    if (!isSuperAdmin) {
      return res.status(403).json({
        data: 'not authorized',
      });
    }

    next();
  }

  async authorizeAdmin(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;

    if (!headers.authorization) {
      return res.status(403).json({
        data: 'not authorized',
      });
    }

    const bearerToken = `${headers.authorization}`;
    const userData = await serviceAuth.validateToken(bearerToken);
    const isAdmin = await serviceAuth.validateRole(userData, 'superadmin');

    if (!isAdmin) {
      return res.status(403).json({
        data: 'not authorized',
      });
    }

    next();
  }
}

export default Auth;
