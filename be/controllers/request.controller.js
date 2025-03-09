const Request = require("../models/request.model");

const checkEmpty = async (
  request_type,
  user_id,
  book_id,
  pickup_date,
  return_date
) => {
  if (!request_type || !user_id || !book_id || !pickup_date || !return_date) {
    return false;
  }
  return true;
};
const createRequest = async (req, res) => {
  const { request_type, user_id, book_id, details, return_date } = req.body;
  if (
    !(await checkEmpty(
      request_type,
      user_id,
      book_id,
      pickup_date,
      return_date
    ))
  ) {
    res
      .status(400)
      .send(
        "request_type, user_id, book_id, pickup_date, return_date is required"
      );
    return;
  }
  const request = new Request({
    request_type,
    user_id,
    book_id,
    details,
    return_date,
  });
  await request.save();
  res.status(201).json(request);
};

module.exports = { createRequest };