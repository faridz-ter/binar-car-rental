import { TParams } from '../interfaces/IRest';
import Books from '../models/Books';

class ServiceBooks {
  constructor() {}
  async list(params?: TParams) {
    try {
      const response = await Books.list();
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new ServiceBooks();
