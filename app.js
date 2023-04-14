// app -> application

const express = require("express");
const cars = require("./routes/cars");

const app = express();

app.use(express.json());

/**
 * @version: 1.0
 * @path -> /cars
 * @vasanthkumar10
 * @author @vasanthkumar10
 * @example: http://localhost:3000/cars -> [{id: 1, name: 'BMW'}]
 */
app.get("/", (req, res) => {
  return res.send("Welcome to vasizebron cars....");
});

app.use("/cars", cars);

app.listen(5000, () => console.log("Server is running on port 5000..."));

// Nodemon -> Node monitor
// nodemon app.js
// CRUD -> create Read Update Delete
