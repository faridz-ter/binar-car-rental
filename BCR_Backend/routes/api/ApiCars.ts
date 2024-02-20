import { Router } from 'express';
// controllers
import ControllerCars from '../../controllers/api/ControllerCars';

// middlewares
import Auth from '../../middlewares/Auth';

// services
import ServiceCars from '../../services/ServiceCars';
import ServiceAuth from '../../services/ServiceAuth';

// repositories
import RepoCars from '../../repositories/RepositoryCars';
import RepoUsers from '../../repositories/RepositoryAuth';

import Media from '../../config/media';

const router = Router();

const middlewareAuth = new Auth();

// Auth
const repoUser = new RepoUsers();
const serviceAuth = new ServiceAuth(repoUser);

// Books
const repoCars = new RepoCars();
const serviceCars = new ServiceCars(repoCars);
const controllerCar = new ControllerCars(serviceCars);

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
router.get('/', controllerCar.list()); // /api/cars READ

router.get('/:car_id', controllerCar.show()); // /api/cars/1 -> /api/books/:car_id READ

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
*         application/json:
*           schema:
*             type: object
*             $ref: '#/components/schema/Car'
*     responses:
*       201:
*         description: Car created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schema/CarResponse'
*     examples:
*       carExample:
*         summary: Example of a car object
*         value:
*           plate: IDN-5442
*           manufacture: Honda
*           model: Civic
*           image: ./images/car25.min.jpg
*           rentPerDay: 1000000
*           capacity: 2
*           description: Electric speed-sensitive variable-assist pwr steering. Steel side-door impact beams. Dual bright exhaust tips.
*           availableAt: 2022-03-23T15:49:05.563Z
*           transmission: CVT
*           available: false
*           type: Wagon
*           year: 2015
*           options:
*             - CD (Single Disc)
*             - Airbag: Passenger
*             - A/C: Front
*             - Power Locks
*             - Navigation
*             - Rear Window Defroster
*             - Rear Window Defroster
*             - MP3 (Single Disc)
*             - Airbag: Side
*           created_by: 1
*           updated_by: 1
*           specs:
*             - Electric speed-sensitive variable-assist pwr steering
*             - Steel side-door impact beams
*             - Dual bright exhaust tips
*             - Remote fuel lid release
*             - Traveler/mini trip computer
*/
router.post('/', middlewareAuth.authorizeAdmin, controllerCar.create()); // /api/cars CREATE

router.post(
  '/upload',
    [middlewareAuth.authorizeAdmin, Media.upload.single('file')],
    controllerCar.upload()
);

router.put('/:car_id', middlewareAuth.authorizeAdmin, controllerCar.update()); // /api/cars/1 -> /api/cars/:car_id UPDATE

router.delete('/:car_id', middlewareAuth.authorizeAdmin, controllerCar.remove()); // /api/cars/1 -> /api/cars/:id DELETE

export default router;