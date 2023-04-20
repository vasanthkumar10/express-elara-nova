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
  .connect("mongodb://localhost:27017/playground") // db is not available, it'll create new DB
  .then(() => console.log("connected to MongoDB....."))
  .catch((err) =>
    console.log("Error occured while connecting mongodb....", err)
  );

// schema
const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  author: String,
  genre: {
    type: [String],
    enum: ["finance", "fantasy", "thriller", "comedy", "horror"],
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// data types -> Number, String, Date, Array, ObjectId, Buffer

// model creation
const Book = mongoose.model("Book", bookSchema);

async function createBook() {
  const book = new Book({
    name: "rich dad poor dad",
    author: "robert kiyosaki",
    genre: ["finance"],
    isPublished: true,
  });

  try {
    const result = await book.save();
    console.log(`Created a book with data - ${result}`);
  } catch (err) {
    console.log(`Error occured while creating book -> ${err}`);
  }
}

// createBook();

// getAllBooks
async function getAllBooks() {
  const books = await Book.find();
  console.log("Books", books);
}

// getAllBooks();

async function getBooks(id) {
  // const books = await Book.find({
  //   // author: "vasanth",
  //   // isPublished: false,
  //   // genre: "comedy",
  // })
  //   .sort({ name: -1 }) // +1 -> asc, -1 -> descending
  //   // .select({ name: 1, author: 1 });
  //   // .count();
  //   .limit(3);

  // // AND
  // const books = await Book.find().and([
  //   { name: "Harry Potter" },
  //   { isPublished: true },
  // ]);

  // OR
  // const books = await Book.find().or([
  //   { name: "Harry Potter" },
  //   { isPublished: true },
  // ]);

  // regular expressions (regex)
  // starts -> /^pattern/
  // const books = await Book.find({ author: /^vas/i });

  // // ends ->  /pattern$/
  // const books = await Book.find({ author: /ling$/i });

  // contains -> /.*pattern.*/
  // const books = await Book.find({ author: /.*ow.*/i });

  // by id
  const books = await Book.find({ _id: id }); // find returns array of objects
  console.log("books", books);
}

// getBooks("64401b3cbd6732914bcdca95");

// update books
// find and update
async function updateBooks(id) {
  const book = await Book.findById(id);
  // console.log("book to be updated", book);
  if (!book) return;
  // book.author = "K K Rowling";
  // book.isPublished = false;

  book.set({
    author: "RR Rowling",
    name: "Harry potter with the newspaper",
  });

  const updatedBook = await book.save();
  console.log(`updated book -> ${updatedBook}`);
}

// updateBooks("64401b3cbd6732914bcdca95");

// delete
async function deleteBooks(id) {
  // const deletedBook = await Book.findByIdAndDelete(id); // recommended
  // const deletedBooks = await Book.deleteOne({ author: "vasanth" });
  const deletedBooks = await Book.deleteMany({ author: "vasanth" });
  console.log("Deleted book", deletedBooks);
}

deleteBooks("64401b3cbd6732914bcdca95");
