const BorrowInfo = require("../models/borrowInfo.model");

const checkEmpty = async (
  user_id,
  book_id,
  borrow_date,
  due_date,
  return_date,
  status
) => {
  if (
    !user_id ||
    !book_id ||
    !borrow_date ||
    !due_date ||
    !return_date ||
    !status
  ) {
    return false;
  }
  return true;
};
async function CreateBorrowInfo(req, res) {
  const { user_id, book_id, borrow_date, due_date, return_date, status } =
    req.body;

  if (
    !(await checkEmpty(
      user_id,
      book_id,
      borrow_date,
      due_date,
      return_date,
      status
    ))
  ) {
    res
      .status(400)
      .send(
        "user_id, book_id, borrow_date, due_date, return_date, status is required"
      );
    return;
  }
  const borrowInfo = new BorrowInfo({
    user_id,
    book_id,
    borrow_date,
    due_date,
    return_date,
    status,
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

module.exports = { CreateBorrowInfo, extendBorrrowTime, returnBook, reExtendBorrrowTime };
