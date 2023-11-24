import { TParams } from '../interfaces/IRest';
import Cars from '../models/Cars';
import RepositoryCars from '../repositories/RepositoryCars';

class ServiceCars {

  constructor() {}

  async list() {
    try {
      const data = await RepositoryCars.findAll();
      const count = await RepositoryCars.getTotalCars();

      return {
        data,
        count,
      };
    } catch (err) {
      throw err;
    }
  }

  async create(requestBody: any) {
    try {
      const inputForm = await RepositoryCars.create(requestBody);
      return inputForm;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async get(car_id: number) {
    try {
      return await RepositoryCars.find(car_id);
    } catch (err) {
      throw err;
    }
  }

  async update(car_id: number, requestBody: any) {
    try {
      return await RepositoryCars.update(car_id, requestBody);
    } catch (err) {
      throw err;
    }
  }

  async delete(car_id: number) {
    try {
      return await RepositoryCars.delete(car_id);
    } catch (err) {
      throw err;
    }
  }
}

export default new ServiceCars();
