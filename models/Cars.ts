import database from '../config/database';
import { Model } from 'objection';

Model.knex(database);

export interface ICars {
  car_id: number;
  name: string;
  price: number;
  picture: string;
  created_by: number;
  updated_by: number;
}

class Cars extends Model {
  static get tableName() {
      return 'cars';
  }
  static get idColumn() {
      return 'car_id';
  }
}

export default Cars;
