const cars = [
  { id: 1, name: "mercedez" },
  { id: 2, name: "ferrari" },
  { id: 3, name: "mahindra" },
];

function createCar(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name } = req.body;
  const newCar = {
    id: cars.length + 1,
    name,
  };

  cars.push(newCar);
  return res.status(201).send(newCar);
}

function deleteCar(req, res) {
  const { id } = req.params;
  const car = cars.find((data) => data.id === Number(id));
  if (!car) return res.status(404).send("car data not found");

  const index = cars.indexOf(car);
  cars.splice(index, 1);

  return res.status(200).send(car);
}

module.exports = {
  deleteCar,
  createCar,
};
