const Book = require("../models/book.model");

async function checkEmpty(
  book_id,
  title,
  author,
  publisher,
  publishDate,
  category,
  isbn,
  total_copies,
  available_copies
) {
  if (
    !book_id ||
    !title ||
    !author ||
    !publisher ||
    !publishDate ||
    !category ||
    !isbn ||
    !total_copies ||
    !available_copies
  ) {
    return false;
  }
  return true;
}

async function checkExist(book_id, isbn) {
  const book = await Book.findOne({ isbn: isbn, book_id: book_id });
  if (book) {
    return true;
  }
  return false;
}

const getBooks = async (req, res) => {
  const { page, limit, filterBy, keyword } = req.body;
  const books = await Book.find({ [filterBy]: keyword })
    .limit(limit)
    .skip((page - 1) * limit);
  res.status(200).json(books);
};

const createBook = async (req, res) => {
  const {
    book_id,
    title,
    author,
    image,
    pageNumber,
    publisher,
    publishDate,
    category,
    isbn,
    total_copies,
    available_copies,
  } = req.body;
  console.log(req.body);
  if (
    !(await checkEmpty(
      book_id,
      title,
      author,
      publisher,
      publishDate,
      category,
      isbn,
      total_copies,
      available_copies
    ))
  ) {
    res
      .status(400)
      .send(
        "  book_id, title, author, category, publisher, publishDate, isbn, total_copies, available_copies is required"
      );
    return;
  }
  if (await checkExist(book_id, isbn)) {
    res.status(400).send(" book_id or isbn of this book is exist");
    return;
  } else {
    const newBook = new Book({
      book_id: book_id,
      title: title,
      author: author,
      image: image,
      pageNumber: pageNumber,
      publisher: publisher,
      publishDate: publishDate,
      category: category,
      isbn: isbn,
      total_copies: total_copies,
      available_copies: available_copies ? available_copies : total_copies,
    });

    await newBook.save();
    res.status(201).json({"message": "Create book successfully", "newBook": newBook});
  }
};

const getBookById = async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id);
  if (!book) {
    res.status(404).send("Not found Book with id " + id + "\n");
  } else {
    res.status(200).json(book);
  }
};

const updateBook = async (req, res) => {
  const id = req.params.id;
  const {
    book_id,
    title,
    author,
    image,
    pageNumber,
    publisher,
    publishDate,
    category,
    isbn,
    total_copies,
    available_copies,
  } = req.body;
  const book = await Book.findById(id);
  if (!book) {
    res.status(404).send("Not found Book with id " + id + "\n");
  } else {
    book.book_id = book_id;
    book.title = title;
    book.author = author;
    book.image = image;
    book.pageNumber = pageNumber;
    book.publisher = publisher;    
    book.publishDate = publishDate;
    book.category = category;
    book.isbn = isbn;
    book.total_copies = total_copies;    
    book.available_copies = available_copies ? available_copies : total_copies;
    await book.save();
    res.status(200).json(book);
  }
};

const deleteBook = async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id);
  if (!book) {
    res.status(404).send("Not found Book with id " + id + "\n");
  } else {
    book.isDeleted = true;
    await book.save();
    res.status(200).json(book);
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
