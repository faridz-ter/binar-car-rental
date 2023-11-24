import { Request, Response, NextFunction } from 'express';
import ServiceAuth from '../services/ServiceAuth';

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
    const userData = await ServiceAuth.validateToken(bearerToken);
    const isSuperAdmin = await ServiceAuth.validateRole(userData, 'superadmin');

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
    const userData = await ServiceAuth.validateToken(bearerToken);
    const isAdmin = await ServiceAuth.validateRole(userData, 'admin');

    if (!isAdmin) {
      return res.status(403).json({
        data: 'not authorized',
      });
    }

    next();
  }
}

export default new Auth();
