const Category = require("../models/category.model");

async function createCategory(req, res) {
  const { category_id, name } = req.body;
  if (!(await checkEmpty(category_id, name))) {
    res.status(400).send("category_id, name is required");
    return;
  }
  if (await checkExist(category_id)) {
    res.status(400).send(" category_id of this category is exist");
    return;
  } else {
    const sv = new Category({ category_id: category_id, name: name });
    await sv.save();
    res.status(201).json(sv);
  }
}

async function updateCategory(req, res) {
  const id = req.params.id;
  const { category_id, name } = req.body;
  const sv = await Category.findById(id);
  if (!sv) {
    res.status(404).send("Not found Category with id " + id + "\n");
  } else {
    sv.category_id = category_id;
    sv.name = name;
    await sv.save();
    res.status(200).json(sv);
  }
}

async function deleteCategory(req, res) {
  const id = req.params.id;
  const sv = await Category.findById(id);
  if (!sv) {
    res.status(404).send("Not found Category with id " + id + "\n");
  } else {
    await sv.remove();
    res.status(200).json(sv);
  }
}

async function getAllCategory(req, res) {
  try {
    const sv = await Category.find();
    res.status(200).json(sv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
};
