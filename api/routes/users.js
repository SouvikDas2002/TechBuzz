const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Post = require("../models/post");

//UPDATE

router.put("/:id", async (req, res) => {
  //checking if right user access or not with id
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      //if user request for update password
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      //update data with body request
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can only update your account");
  }
});

//DELETE

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id); //find by id for check the use exist or not
      try {
        await Post.deleteMany({ username: user.username }); //if the user does not exist delete all posts of that user

        // delete user by id
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("USer has been deleted ...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found");
    }
  } else {
    res.status(401).json("You can delete only your account");
  }
});

//GET USER with id

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) res.status(400).json("user not exists");
    else {
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
