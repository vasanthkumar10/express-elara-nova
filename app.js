// app -> application

const express = require("express");
const morgan = require("morgan");

const cars = require("./routes/cars");

const app = express();

// middleware -> req, res, next
// types -> inbuilt, routers, custom middlewares
// Request Processing Pipeline

if (app.get("env") === "development") {
  console.log("Morgan enabled.....");
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// template engines
app.set("view engine", "pug");
app.set("views", "./views");

// /**
//  * @version: 1.0
//  * @path -> /cars
//  * @vasanthkumar10
//  * @author @vasanthkumar10
//  * @example: http://localhost:3000/cars -> [{id: 1, name: 'BMW'}]
//  */
// app.get("/:name", (req, res) => {
//   const { name } = req.params;
//   return res.render("index", {
//     title: "Newton school",
//     message: `Welcome to Newton school ${name}`,
//   });
// });

// custom middleware
app.use(function authenticate(req, res, next) {
  const { user_id } = req.headers;
  if (user_id === "123") return res.status(403).send("Invalid user");
  else next();
});

// app.use(validateReq());

// Environments -> development, testing, production

// console.log("environment --->", app.get("env"));

app.use("/cars", cars);

// // custom middleware
// app.use(function (req, res, next) {
//   console.log("calling custom middleware.....");
//   console.log(`req -> ${req} and res -> ${res}`);
//   next(); // req will go to next middleware
// });

app.listen(5000, () => console.log("Server is running on port 5000..."));

// Nodemon -> Node monitor
// nodemon app.js
// CRUD -> create Read Update Delete
