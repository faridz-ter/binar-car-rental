import RepositoryCars, { IParams } from '../repositories/RepositoryCars';
import { IUsers } from "../models/Users";
import { ICars } from "../models/Cars";

class ServiceCars {
  private _repoCar: RepositoryCars;
  private _user: IUsers | undefined;

  constructor(repoCar: RepositoryCars) {
    this._repoCar = repoCar;
  }

  async list(params?: IParams) {
    const cars = await this._repoCar.list(params);
    return cars;
  }

  async count(params?: IParams) {
    const result = await this._repoCar.count(params);
    return result;
  }

  async show(id: string) {
    const car = await this._repoCar.show(id);
    return car;
  }

  async create(carData: ICars) {
    const user = this.getUser as IUsers;
    const cars = await this._repoCar.create(user, carData);
    return cars;
  }

  async update(id: string, carData: ICars) {
    const user = this.getUser as IUsers;
    const cars = await this._repoCar.update(user, id, carData);
    return cars;
  }
  async remove(id: string) {
    const user = this.getUser as IUsers;
    const books = await this._repoCar.remove(user, id);
    return books;
  }
  set setUser(userData: IUsers) {
    this._user = userData;
  }

  get getUser() {
    return this._user;
  }
}

export default ServiceCars;
