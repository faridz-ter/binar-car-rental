/**
 * @openapi
 * components:
 *   schema:
 *     Car:
 *       type: object
 *       required:
 *         - name
 *         - picture
 *         - price
 *         - created_by
 *         - updated_by
 *       properties:
 *         car_id:
 *           type: integer
 *           description: The ID of the car.
 *         name:
 *           type: string
 *           minLength: 1
 *           maxLength: 20
 *           description: The manufacture of the car.
 *         picture:
 *           type: string
 *           format: binary
 *           description: The image of the car.
 *         price:
 *           type: string
 *           description: The rent per day of the car.
 *         created_by:
 *           type: integer
 *           description: ID of the user who created the car entry.
 *         updated_by:
 *           type: integer
 *           description: ID of the user who last updated the car entry.
 *     CarResponse:
 *        type: object
 *        properties:
 *          car_id:
 *            type: integer
 *            description: The ID of the car.
 *          picture:
 *            type: string
 *            description: The image of the car.
 *          price:
 *            type: string
 *            description: The rent per day of the car.
 *          created_by:
 *            type: integer
 *            description: ID of the user who created the car entry.
 *          updated_by:
 *            type: integer
 *            description: ID of the user who last updated the car entry.
 *     
 */