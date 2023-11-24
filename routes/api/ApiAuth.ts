import { Router } from 'express';
import ControllerAuth from '../../controllers/api/ControllerAuth';

import MiddlewareAuth from '../../middlewares/Auth';

class ApiAuth {
  private router: Router;
  constructor() {
    this.router = Router();
  }
  routes() {
    this.router.post('/login', ControllerAuth.login);
    /**
    * @openapi
    * '/api/user/register-admin':
    *  post:
    *     tags:
    *     - Auth - Admin Registration
    *     summary: Register a Admin
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *              $ref: '#/components/schemas/CreateAdminInput'
    *     responses:
    *      200:
    *        description: Success
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/CreateAdminResponse'
    *      409:
    *        description: Conflict
    *      400:
    *        description: Bad request
    */
    this.router.post(
      '/register-admin',
      MiddlewareAuth.authorizeSuperAdmin,
      ControllerAuth.registerAdmin
      // MiddlewareAuth.authorizeSuperAdmin,
      // ControllerAuth.registerAdmin
    );
    return this.router;
  }
}

export default new ApiAuth();
