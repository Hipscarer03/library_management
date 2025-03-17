const Fine = require("../models/fine.model");
const User = require("../models/user.model");

const checkEmpty = async (
  fine_id,
  user_id,
  book_id,
  amount,
  reason,
  status,
  issued_date
) => {
  if (
    !fine_id ||
    !user_id ||
    !book_id ||
    !amount ||
    !reason ||
    !status ||
    !issued_date
  ) {
    return false;
  }
  return true;
};


const createFine = async (req, res) => {
  const { fine_id, user_id, book_id, amount, reason, status, issued_date } =
    req.body;

  if (
    !(await checkEmpty(
      fine_id,
      user_id,
      book_id,
      amount,
      reason,
      status,
      issued_date
    ))
  ) {
    res
      .status(400)
      .send(
        "fine_id, user_id, book_id, amount, reason, status, issued_date is required"
      );
    return;
  }

  const fineExist = await checkExist(fine_id);
  if (fineExist) {
    res.status(400).send(" fine_id of this fine is exist");
    return;
  }
  const fine = new Fine({
    fine_id,
    user_id,
    book_id,
    amount,
    reason,
    status,
    issued_date,
  });
  await fine.save();
  const user = await User.findById(user_id);
  user.fines.push(fine._id);
  await user.save();
  res.status(201).json(fine);
};

const getFineById = async (req, res) => {
  const id = req.params.id;
  const fine = await Fine.findById(id);
  if (!fine) {
    res.status(404).send("Not found Fine with id " + id + "\n");
  } else {
    res.status(200).json(fine);
  }
};

const getFine = async (req, res) => {
  const fine = await Fine.find();
  res.status(200).json(fine);
};

const updateFine = async (req, res) => {
  const id = req.params.id;
  const { amount, reason, status, issued_date, payment_date } = req.body;
  const fine = await Fine.findById(id);
  if (!fine) {
    res.status(404).send("Not found Fine with id " + id + "\n");
  } else {

    fine.amount = amount;
    fine.reason = reason;
    fine.status = status;
    fine.issued_date = issued_date;
    fine.payment_date = payment_date;
    await fine.save();
    res.status(200).json(fine);
  }
};

const payFine = async (req, res) => {
  const id = req.params.id;
  const {payment_date} = req.body;
  const fine = await Fine.findById(id);
  if (!fine) {
    res.status(404).send("Not found Fine with id " + id + "\n");
  } else {
    fine.status = "paid";
    fine.payment_date = payment_date;
    await fine.save();
    res.status(200).json(fine);
  }
};

module.exports = { createFine, getFine, getFineById, updateFine, payFine };
