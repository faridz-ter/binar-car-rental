import { Router } from 'express';
import ControllerAuth from '../../controllers/api/ControllerAuth';

import MiddlewareAuth from '../../middlewares/Auth';
import ServiceAuth from '../../services/ServiceAuth';
import RepoUsers from '../../repositories/RepositoryAuth';

const middlewareAuth = new MiddlewareAuth();

// Auth
const repoUser = new RepoUsers();
const serviceAuth = new ServiceAuth(repoUser);
const controllerAuth = new ControllerAuth(serviceAuth);

const router = Router();

router.post('/login', controllerAuth.login());

router.post( '/register', controllerAuth.register());

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
router.post( '/register-admin', middlewareAuth.authorizeSuperAdmin, controllerAuth.registerAdmin());

export default router;
