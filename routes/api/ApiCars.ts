import { Router } from 'express';
import Auth from '../../middlewares/Auth';
import Upload from "../../middlewares/Upload";
import ControllerCars from '../../controllers/api/ControllerCars';
import Media from "../../config/media";

class ApiCars {
  private router: Router;
  constructor() {
    this.router = Router();
  }
  routes() {

    /**
    * @openapi
    * /api/cars/:
    *  get:
    *     tags:
    *     - CRUD - List All Cars
    *     description: Responds if the app is up and running
    *     responses:
    *       200:
    *         description: App is up and running
    */
    this.router.get('/', ControllerCars.list); // /api/cars READ

    this.router.get('/:car_id', ControllerCars.show); // /api/cars/1 -> /api/books/:car_id READ

    /**
    * @openapi
    * '/api/cars/':
    *   post:
    *     tags:
    *       - CRUD - Create New Car
    *     summary: Create a new car
    *     requestBody:
    *       required: true
    *       content:
    *         multipart/form-data:
    *           schema:
    *             type: object
    *             $ref: '#/components/schema/Car'
    *     responses:
    *       200:
    *         description: Car created
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schema/CarResponse'
    *     examples:
    *       carExample:
    *         summary: Example of a car object
    *         value:
    *           name: Honda
    *           picture: ./images/car25.min.jpg
    *           price: 3000
    *           created_by: 6
    *           updated_by: 6
    */
    this.router.post('/',
      Media.upload.single('file'),
      Upload.handleUpload,
      Auth.authorizeAdmin,
      ControllerCars.create
    ); // /api/cars CREATE

    this.router.put('/:car_id',
      Media.upload.single('file'),
      Upload.handleUpload,
      Auth.authorizeAdmin,
      ControllerCars.update
    ); // /api/cars/1 -> /api/cars/:car_id UPDATE

    this.router.delete('/:car_id',
      Auth.authorizeAdmin,
      ControllerCars.remove
    ); // /api/cars/1 -> /api/cars/:id DELETE

    return this.router;
  }
}

export default new ApiCars();
