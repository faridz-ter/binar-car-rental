import Cars, { ICars } from "../models/Cars";
import { IUsers } from '../models/Users';

export interface IParams {
  page?: number;
  size?: number;
  search?: string;
}

class RepositoryCars {
  constructor() {}

  async count(params?: IParams) {
    const allCars = Cars.query().count('car_id').where('available', true);
    if (params?.search) {
      allCars
        .whereILike('manufacture', `%${params?.search}%`)
        .orWhereILike('type', `%${params?.search}%`);
    }
    return Number(
      ((await allCars) as unknown as { count: number }[])[0].count
    );
  }

  async list(params?: IParams) {
    const size = params?.size ? Number(params?.size) : 10;
    const page = params?.page ? Number(params?.page) - 1 : 0;

    const listCars = Cars.query()
      .select('*')
      .page(page, size)
      // .limit(size)
      // .offset(page * size)
      // .where('available', true);
      // .orderBy('createdAt', 'asc');

    if (params?.search) {
      listCars
      .whereILike('manufacture', `%${params?.search}%`)
      .orWhereILike('type', `%${params?.search}%`);
    }

    return await listCars;
  }

  async show(id: string) {
    const books = await Cars.query().findById(id);
    return books;
  }

  async create(user: IUsers, carData: ICars) {
    const car = await Cars.query().insert({
      ...carData,
      created_by: user.id,
    });

    return car;
  }

  async update(user: IUsers, id: string, carData: ICars) {
    const car = await Cars.query()
      .update({
        ...carData,
        updated_by: user.id,
        updated_at: new Date().toISOString(),
      })
      .where('id', `${id}`);
    return car;
  }

  async remove(user: IUsers, id: string) {
    const car = await Cars.query().deleteById(id);
    return car;
  }
}

export default RepositoryCars;