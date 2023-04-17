const express = require("express");
const router = express.Router();
const log = require("debug")("app:startup");
const db = require("debug")("app:db");
const { validate } = require("../utils/validate");
const { deleteCar, createCar } = require("../controllers/carController");

const cars = [
  { id: 1, name: "mercedez" },
  { id: 2, name: "ferrari" },
  { id: 3, name: "mahindra" },
];

// static API
router.get("/", (req, res) => {
  log("Sending cars", cars);
  return res.send(cars);
});

// router.get("/check/:name/:age", (req, res) => {
//   return res.send(req.params);
// });

// dynamic API -> params and query strings
// :id -> id paramater
router.get("/:id", (req, res) => {
  const { id } = req.params; // string
  const car = cars.find((data) => data.id === Number(id));
  if (!car) return res.status(404).send("Car id is not found");
  log("Sending car with id", id);
  db("Sending car with id", id);
  return res.send(car);
});

router.post("/", (req, res) => {
  // if (!name) return res.status(400).send("Name parameter is required...");

  // define schema
  // const schema = Joi.object({
  //   name: Joi.string().min(3).max(15).required(),
  // });

  // const result = schema.validate(req.body);
  // if (result.error)
  //   return res.status(400).send(result.error.details[0].message);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name } = req.body;
  const newCar = {
    id: cars.length + 1,
    name,
  };

  cars.push(newCar);
  return res.status(201).send(newCar);
});

router.put("/:id", (req, res) => {
  // const { name } = req.body;
  // if (!name) return res.status(400).send("Name parameter is required...");

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name } = req.body;
  const { id } = req.params;
  const car = cars.find((data) => data.id === Number(id));
  if (!car) return res.status(404).send("Car data not found");

  car.name = name;
  return res.status(200).send(car);
});

router.delete("/:id", deleteCar);
// router.delete("/data/:id", deleteCar);

module.exports = router;
