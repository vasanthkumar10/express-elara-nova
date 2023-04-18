// Data base -> It is a place where we can store and retrieve the data
// SQL -> Structured Querying Language -> tables and rows
// Pros -> Very fast, consistent, stable, optimise
// Cons -> memory wastage, When the size grows I need to
// improve the hardware -> searching is difficult (vertical scaling)

// No SQL -> collection (table) and documents(rows)
// Pros -> Less memory wastage, when the data size increases,
// I can split the collection -> horizontal scaling
// cons -> slow, not consistent, optimisation is also less

// mongodb -> ORM (Object Relational Mapper) -> mongoose (node js)

const mongoose = require("mongoose");

// connection
mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => console.log("connected to MongoDB....."))
  .catch((err) =>
    console.log("Error occured while connecting mongodb....", err)
  );
