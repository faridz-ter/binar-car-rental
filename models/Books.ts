import { IRestModel, TParams } from '../interfaces/IRest';
import database from '../config/database';

interface IBooks {
  id: string;
  title: string;
  author: string;
  published_year: string;
  total_copies: number;
  copies_available: number;
  genre: string;
}

class Books implements IRestModel<IBooks> {
  constructor() {}
  async create(payload: IBooks) {}
  async list(params?: TParams) {
    const data = await database.select('*').from('cars');
    return data as IBooks[];
  }
  async remove(id: string) {}
  async show(id: string) {}
  async update(id: string, payload: IBooks) {}
}

export default new Books();
