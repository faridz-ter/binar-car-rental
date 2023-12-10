/**
 * @openapi
 * components:
 *  schemas:
 *    CreateAdminInput:
 *      type: object
 *      required:
 *        - username
 *        - email
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: admin-rental
 *        email:
 *          type: string
 *          default: admin-rental@binar-cars-rental.com
 *        password:
 *          type: string
 *          default: adminrental
 *    CreateAdminResponse:
 *      type: object
 *      properties:
 *        user_id:
 *          type: string
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */