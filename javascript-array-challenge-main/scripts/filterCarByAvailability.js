function filterCarByAvailability(cars) {
  // Sangat dianjurkan untuk console.log semua hal hehe
  // console.log(cars.length);

  // Tempat penampungan hasil
  const result = [];

  // Tulis code-mu disini
  for (let i = 0; i < cars.length - 1; i++) {
    const car = cars[i];
    if (car['available'] === true ){
      result.push(car)
    }
  }

  // Rubah code ini dengan array hasil filter berdasarkan availablity
  return result;
}
