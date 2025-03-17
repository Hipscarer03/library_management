const Request = require("../models/request.model");

checkType = (
  request_type,
  book_id,
  { new_due_date, book_suggestion, pickup_date }
) => {
  if (request_type === "extend_time") {
    if (!new_due_date || !book_id) {
      return false;
    }
  }
  if (request_type === "suggest_book") {
    if (!book_suggestion) {
      console.log("book_suggestion");
      return false;
    }
  }
  if (request_type === "reserve_book") {
    if (!pickup_date || !book_id) {
      return false;
    }
  }
  return true;
};
const checkEmpty = async (
  request_id,
  request_type,
  user_id,
  book_id,
  details
) => {
  if (!request_id || !request_type || !user_id) {
    return false;
  }
  if (!checkType(request_type, book_id, details)) {
    return false;
  }
  return true;
};

const checkExist = async (request_id) => {
  const request = await Request.findOne({ request_id: request_id }).exec();
  if (request) {
    return true;
  }
  return false;
};

const createRequest = async (req, res) => {
  const { request_id, request_type, user_id, book_id, details } = req.body;
  if (
    !(await checkEmpty(request_id, request_type, user_id, book_id, details))
  ) {
    res
      .status(400)
      .send(
        " request_id, request_type, user_id, book_id, pickup_date, return_date is required"
      );
    return;
  }
  const request = new Request({
    request_id,
    request_type,
    user_id,
    book_id,
    details,
    status: "pending",
  });
  await request.save();
  res.status(201).json(request);
};

const getRequest = async (req, res) => {
  const requests = await Request.find().exec();
  res.status(200).json(requests);
};

const getRequestByUserId = async (req, res) => {
  const { user_id, request_type } = req.params;
  const request = await Request.find({ user_id, request_type }).exec();
  if (!request) {
    res.status(404).send("Not found Request with id " + user_id + "\n");
  } else {
    res.status(200).json(request);
  }
};

const updateRequest = async (req, res) => {
  const { request_id } = req.params;
  const { book_id, request_type, details, status } = req.body;
  if (!checkType(request_type)) {
    res.status(400).send("details is not enough information");
  }
  const request = await Request.findById(request_id).exec();
  if (!request) {
    res.status(404).send("Not found Request with id " + request_id + "\n");
  } else {
    request.book_id = book_id;
    request.request_type = request_type;
    request.details = details;
    request.status = status;
    await request.save();
    res.status(200).json(request);
  }
};

const deleteRequest = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const request = await Request.findById(id).exec();
  if (!request) {
    res.status(404).send("Not found Request with id " + id + "\n");
  } else {
    await Request.deleteOne({ request_id: id }).exec();
    res.status(200).json(request);
  }
};

module.exports = {
  createRequest,
  getRequest,
  getRequestByUserId,
  updateRequest,
  deleteRequest,
};
