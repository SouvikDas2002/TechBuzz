const router = require("express").Router();
const Categories = require("../models/categories");

router.post("/", async (req, res) => {
  const newCat = new Categories(req.body);
  try {
    const saveCategory = await newCat.save();
    res.status(200).json(saveCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const Category = await Categories.find();
    res.status(200).json(Category);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
