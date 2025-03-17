const BorrowInfo = require("../models/borrowInfo.model");
const Book = require("../models/book.model");
const Fine = require("../models/fine.model");

const checkEmpty = async (user_id, book_id, borrow_date, due_date) => {
  if (!user_id || !book_id || !borrow_date || !due_date) {
    return false;
  }
  return true;
};

const checkBookExist = async (book_id) => {
  const book = await Book.findById(book_id);
  if (book) {
    return true;
  }
  return false;
};

const getBorrowInfo = async (req, res) => {
  try {
    const borrowInfo = await BorrowInfo.find();
    res.status(200).json(borrowInfo);
  } catch (err) {
    console.log(err);
  }
};
const getBorrowInfoByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const borrowInfoList = await BorrowInfo.find({ user_id: id });

    const formatBorrowInfo = await Promise.all(
      borrowInfoList.map(async (borrowInfo) => {
        const book = await Book.findById(borrowInfo.book_id);
        return {
          ...borrowInfo.toObject(), // Chuyển mongoose document thành object thường
          title: book.title,
          isbn: book.isbn,
          image: book.image,
        };
      })
    );

    res.status(200).json(formatBorrowInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function createBorrowInfo(req, res) {
  const { user_id, book_id, borrow_date, due_date } = req.body;

  if (!(await checkEmpty(user_id, book_id, borrow_date, due_date))) {
    res
      .status(400)
      .send("user_id, book_id, borrow_date, due_date, return_date is required");
    return;
  }

  if (!(await checkBookExist(book_id))) {
    res.status(404).send("Not found Book with id " + book_id + "\n");
    return;
  }

  const borrowInfo = new BorrowInfo({
    borrow_info_id: new Date().getTime().toString(),
    user_id,
    book_id,
    borrow_date,
    due_date,
    gid: 4,
    status: "borrowing",
  });
  await borrowInfo.save();
  res.status(201).json(borrowInfo);
}

async function extendBorrrowTime(req, res) {
  const id = req.params.id;
  const { due_date } = req.body;
  const borrowInfo = await BorrowInfo.findById(id);
  if (!borrowInfo && borrowInfo.gid >= 1) {
    res.status(404).send("Not found BorrowInfo with id " + id + "\n");
  } else {
    borrowInfo.due_date = due_date;
    borrowInfo.gid--;
    await borrowInfo.save();
    res.status(200).json(borrowInfo);
  }
}
async function reExtendBorrrowTime(req, res) {
  const id = req.params.id;
  const borrowInfo = await BorrowInfo.findById(id);
  if (!borrowInfo) {
    res.status(404).send("Not found BorrowInfo with id " + id + "\n");
  } else {
    let today = new Date();
    const due_date = today.setDate(today.getDate() + 7);
    borrowInfo.due_date = due_date;
    borrowInfo.gid = 4;
    await borrowInfo.save();
    res.status(200).json(borrowInfo);
  }
}

async function returnBook(req, res) {
  const id = req.params.id;
  const { user_id } = req.body;
  const borrowInfo = await BorrowInfo.findById(id);
  if (!borrowInfo) {
    res.status(404).send("Not found BorrowInfo with id " + id + "\n");
  } else {
    const fine = await Fine.findOne({
      user_id: user_id,
      book_id: borrowInfo.book_id,
    });
    if (fine && fine.status === "unpaid") {
      res.status(400).send("You have to pay fine first");
    }
    borrowInfo.return_date = new Date();
    borrowInfo.status = "returned";
    await borrowInfo.save();
    res.status(200).json(borrowInfo);
  }
}

module.exports = {
  createBorrowInfo,
  extendBorrrowTime,
  returnBook,
  reExtendBorrrowTime,
  getBorrowInfoByUserId,
  getBorrowInfo,
};
