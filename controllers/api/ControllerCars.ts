import { Request, Response } from 'express';
import { IRestController } from '../../interfaces/IRest';
import ServiceCars from '../../services/ServiceCars';
import ServiceAuth from "../../services/ServiceAuth";

class ControllerBooks implements IRestController {
  constructor() { }

  async list(_: Request, res: Response) {
    try {
      const { data, count } = await ServiceCars.list();
      res.status(200).json({
        status: 'OK',
        data: { cars: data },
        meta: { total: count },
      });
    } catch (error: any) {
      res.status(500).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  }

  async show(req: Request, res: Response) { 
    try {
      const { car_id } = req.params;
      const car = await ServiceCars.get(parseInt(car_id, 10));
      res.status(200).json({
        status: 'OK',
        data: car,
      });
    } catch (error: any) {
      res.status(422).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  }

  async create(req: Request, res: Response) { 
    try {
      const imgURL: string = (req as any).imgURL;
      const headers = req.headers;
      if (!headers.authorization) {
        return res.status(403).json({
          data: 'not authorized',
        });
      }

      const bearerToken = `${headers.authorization}`;
      const createdBy = ServiceAuth.validateToken(bearerToken);

      const requestBodyWithImgURL = {
        name : req.body.name,
        price : req.body.price,
        picture : imgURL,
        created_by: (await createdBy).id,
        updated_by: (await createdBy).id
      };

      const createdcar = await ServiceCars.create(requestBodyWithImgURL);
      res.status(201).json({
        status: 'OK',
        message : 'Success Create a Car',
        data: createdcar,
      });
    } catch (error) {
      res.status(422).json({
        status: 'FAIL',
        meta : 'Failed Create a Car',
        message: error,
      });
    }
  }

  async remove(req: Request, res: Response) { 
    try {
      const { car_id } = req.params;
      await ServiceCars.delete(parseInt(car_id, 10));
      res.status(200).json({
        status: 'OK',
        message: "Successfully deleted car",
      });
    } catch (error: any) {
      res.status(422).json({
        status: 'FAIL',
        meta : 'Failed Delete a Car',
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) { 
    try {
      const imgURL: string = (req as any).imgURL;

      const headers = req.headers;

      if (!headers.authorization) {
        return res.status(403).json({
          data: 'not authorized',
        });
      }
      const bearerToken = `${headers.authorization}`;
      const updatedBy = ServiceAuth.validateToken(bearerToken);

      const requestBodyWithImgURL = {
        name : req.body.name,
        price : req.body.price,
        picture : imgURL,
        updated_by: (await updatedBy).id
      };

      const { car_id } = req.params;
      const updatedCar = await ServiceCars.update(parseInt(car_id, 10), requestBodyWithImgURL);
      res.status(200).json({
        status: 'OK',
        message : 'Success Update a Car',
        data: updatedCar
      });
    } catch (error) {
      res.status(422).json({
        status: 'FAIL',
        meta : 'Failed Update a Car',
        message: error,
      });
    }
  }
}

export default new ControllerBooks();
