const router = require("express").Router();
const Category = require("../models/Category");



//create categories

router.post("/", async (req, res) => {
  const category = new Category(req.body);
  try {
    const newCategory = category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(500).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});



module.exports = router;
