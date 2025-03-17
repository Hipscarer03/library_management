const Book = require("../models/book.model");
const User = require("../models/user.model");

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
    res
      .status(201)
      .json({ message: "Create book successfully", newBook: newBook });
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

// review

checkEmpty = async (
  review_id,
  user_id,
  rating,
  comment,
  status,
  review_date
) => {
  if (
    !review_id ||
    !user_id ||
    !rating ||
    !comment ||
    !status ||
    !review_date
  ) {
    return false;
  }
  return true;
};

checkExist = async (review_id) => {
  const book = await Book.findOne({ "reviews.review_id": review_id });
  if (book) {
    return true;
  }
  return false;
};
const createReview = async (req, res) => {
  const { review_id, user_id, rating, comment, status, review_date } = req.body;

  if (
    !(await checkEmpty(
      review_id,
      user_id,
      rating,
      comment,
      status,
      review_date
    ))
  ) {
    res
      .status(400)
      .send(
        "review_id, user_id, rating, comment, status, review_date is required"
      );
    return;
  }

  if (await checkExist(review_id)) {
    res.status(400).send("review_id of this review is exist");
    return;
  }

  const user = await User.findOne({ _id: user_id });
  if (!user) {
    res.status(404).send("Not found User with id " + user_id + "\n");
    return;
  }
  const book = await Book.findOne({ _id: req.params.id });
  if (!book) {
    res.status(404).send("Not found Book with id " + req.params.id + "\n");
    return;
  }
  const review = {
    review_id: review_id,
    user_id: user_id,
    rating: rating,
    comment: comment,
    status: status,
    review_date: review_date,
  };
  book.reviews.push(review);
  await book.save();
  res.status(201).json(book);
};

const updateReview = async (req, res) => {
  try {
    const id = req.params.id;
    const { review_id, rating, comment, status, review_date } = req.body;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send("Not found Book with id " + id + "\n");
      return;
    }
    const review = book.reviews.find(
      (review) => review.review_id === review_id
    );
    if (!review) {
      res.status(404).send("Not found Review with id " + review_id);
      return;
    }
    review.rating = rating;
    review.comment = comment;
    review.status = status;
    review.review_date = review_date;
    await book.save();
    res.status(200).json(book);
  } catch (err) {
    console.log(err);
  }
};

const deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    const { review_id } = req.body;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send("Not found Book with id " + id + "\n");
      return;
    }
    const review = book.reviews.find(
      (review) => review.review_id === review_id
    );
    if (!review) {
      res.status(404).send("Not found Review with id " + review_id);
      return;
    }
    book.reviews = book.reviews.filter(
      (review) => review.review_id !== review_id
    );
    await book.save();
    res.status(200).json(book);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  createReview,
  updateReview,
  deleteReview,
};
