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

const express = require("express");
const mongoose = require("mongoose");
const orders = require("../routes/order");
const user = require("../routes/user");
const auth = require("../routes/auth");
const cors = require("cors");
require("dotenv").config({
  path: "../.env",
});

const app = express();

// db connection
mongoose
  .connect("mongodb://localhost:27017/playground") // db is not available, it'll create new DB
  .then(() => console.log("connected to MongoDB....."))
  .catch((err) =>
    console.log("Error occured while connecting mongodb....", err)
  );

// process
// console.log("process", process.env.NODE_ENV, app.get("env"));
console.log("JWT key", process.env.JWT_PRIVATE_KEY);

// middleware;
app.use(express.json());

app.use(cors());

app.use("/order", orders);
app.use("/user", user);
app.use("/auth", auth);

// server connection
app.listen(5000, () => console.log("server running on port 5000..."));

// // schema
// const bookSchema = new mongoose.Schema({
//   name: { type: String, required: true, minlength: 3, maxlength: 50 },
//   author: String,
//   genre: {
//     type: [String],
//     enum: ["finance", "fantasy", "thriller", "comedy", "horror"],
//   },
//   date: { type: Date, default: Date.now },
//   isPublished: Boolean,
// });

// // data types -> Number, String, Date, Array, ObjectId, Buffer

// // model creation
// const Book = mongoose.model("Book", bookSchema);

// async function createBook() {
//   const book = new Book({
//     name: "rich dad poor dad",
//     author: "robert kiyosaki",
//     genre: ["finance"],
//     isPublished: true,
//   });

//   try {
//     const result = await book.save();
//     console.log(`Created a book with data - ${result}`);
//   } catch (err) {
//     console.log(`Error occured while creating book -> ${err}`);
//   }
// }

// // createBook();

// // getAllBooks
// async function getAllBooks() {
//   const books = await Book.find();
//   console.log("Books", books);
// }

// // getAllBooks();

// async function getBooks(id) {
//   // const books = await Book.find({
//   //   // author: "vasanth",
//   //   // isPublished: false,
//   //   // genre: "comedy",
//   // })
//   //   .sort({ name: -1 }) // +1 -> asc, -1 -> descending
//   //   // .select({ name: 1, author: 1 });
//   //   // .count();
//   //   .limit(3);

//   // // AND
//   // const books = await Book.find().and([
//   //   { name: "Harry Potter" },
//   //   { isPublished: true },
//   // ]);

//   // OR
//   // const books = await Book.find().or([
//   //   { name: "Harry Potter" },
//   //   { isPublished: true },
//   // ]);

//   // regular expressions (regex)
//   // starts -> /^pattern/
//   // const books = await Book.find({ author: /^vas/i });

//   // // ends ->  /pattern$/
//   // const books = await Book.find({ author: /ling$/i });

//   // contains -> /.*pattern.*/
//   // const books = await Book.find({ author: /.*ow.*/i });

//   // by id
//   const books = await Book.find({ _id: id }); // find returns array of objects
//   console.log("books", books);
// }

// // getBooks("64401b3cbd6732914bcdca95");

// // update books
// // find and update
// async function updateBooks(id) {
//   const book = await Book.findById(id);
//   // const result = await Book.updateMany(
//   //   { isPublished: false },
//   //   {
//   //     $set: {
//   //       name: "vasanth",
//   //     },
//   //   }
//   // );

//   // const book = await Book.findByIdAndUpdate(
//   //   id,
//   //   {
//   //     $set: {
//   //       name: "vasanthkumar updated",
//   //     },
//   //   },
//   //   {
//   //     new: true,
//   //   }
//   // );

//   // findbyId and Update -> returns original data
//   console.log("book to be updated", book);
//   if (!book) return;
//   // book.author = "K K Rowling";
//   // book.isPublished = false;

//   if (book.genre.includes("comedy")) return;
//   book.set({
//     author: "RR Rowling",
//     name: "Harry potter with the newspaper",
//   });
//   const updatedBook = await book.save();
//   console.log(`updated book -> ${updatedBook}`);
// }

// updateBooks("64401bfabe8a3ce4896f320a");

// // delete
// async function deleteBooks(id) {
//   // const deletedBook = await Book.findByIdAndDelete(id); // recommended
//   // const deletedBooks = await Book.deleteOne({ author: "vasanth" });
//   const deletedBooks = await Book.deleteMany({ author: "vasanth" });
//   console.log("Deleted book", deletedBooks);
// }

// deleteBooks("64401b3cbd6732914bcdca95");

// Trade off -> embedded or consistency
// author_id in book table is referring the author table
// Normalisation -> consistent and easy to update
// cons -> slow process of searching the data because of multiple calls to db
// Book
// let book = {
//   id: 1,
//   name: "hidden secrets",
//   authorId: 1,
//   genre: "horror",
//   price: 400,
// };

// // Author
// let author = {
//   id: 1,
//   name: "vasanth",
//   age: 20,
//   place: "chennai",
//   books: [1, 10, 13],
// };

// // embedded documents
// // denormalisation -> high query performance
// // no consistency and updation is costly
// let book = {
//   id: 1,
//   name: "hidden secrets",
//   genre: "horror",
//   price: 400,
//   author: {
//     name: "vasanth",
//     age: 20,
//     place: "chennai",
//     books: [1, 10, 13],
//   },
// };
