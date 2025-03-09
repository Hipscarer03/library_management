const Book = require("../models/book.model");

async function checkEmpty(
  book_id,
  title,
  author,
  category,
  isbn,
  total_copies,
  available_copies
) {
  if (
    !book_id ||
    !title ||
    !author ||
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

const SearchBook = async (req, res) => {
  const {page, limit, filterBy, keyword} = req.body;
  const books = await Book.find({ [filterBy]: keyword }).limit(limit).skip((page - 1) * limit);
  res.status(200).json(books);
};

const InsertBook = async (req, res) => {
  const {
    book_id,
    title,
    author,
    category,
    isbn,
    total_copies,
    available_copies,
  } = req.body;
  // console.log(req.body);
  if (
    !(await checkEmpty(
      book_id,
      title,
      author,
      category,
      isbn,
      total_copies,
      available_copies
    ))
  ) {
    res
      .status(400)
      .send(
        "  book_id, title, author, category, isbn, total_copies, available_copies is required"
      );
    return;
  }
  if (await checkExist(book_id, isbn)) {
    res.status(400).send(" book_id or isbn of this book is exist");
    return;
  } else {
    const sv = new Book({});
    await sv.save();
    res.status(201).json(sv);
  }
};

const FindById = async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id);
  if (!book) {
    res.status(404).send("Not found Book with id " + id + "\n");
  } else {
    res.status(200).json(sv);
  }
};

const UpdateBook = async (req, res) => {
  const id = req.params.id;
  const { BookCode, BookName, Mark, Gender } = req.body;
  const sv = await Book.findById(id);
  if (!sv) {
    res.status(404).send("Not found Book with id " + id + "\n");
  } else {
    sv.BookCode = BookCode;
    sv.BookName = BookName;
    await sv.save();
    res.status(200).json(sv);
  }
};

const DeleteBook = async (req, res) => {
  const id = req.params.id;
  const sv = await Book.findById(id);
  if (!sv) {
    res.status(404).send("Not found Book with id " + id + "\n");
  } else {
    await sv.remove();
    res.status(200).json(sv);
  }
};

module.exports = {
  SearchBook,
  InsertBook,
  FindById,
  UpdateBook,
  DeleteBook,
};
