import Cars from "../models/Cars";

class RepositoryCars {
  create(createArgs: any) {
    return Cars.query().insert(createArgs);
  }

  update(car_id: number, updateArgs: any) {
    return Cars.query().patchAndFetchById(car_id, updateArgs);
  }

  delete(car_id: number) {
    return Cars.query().deleteById(car_id);
  }

  find(car_id: number) {
    return Cars.query().findById(car_id);
  }

  findAll() {
    return Cars.query();
  }

  getTotalCars() {
    return Cars.query().resultSize();
  }
}

export default new RepositoryCars();