const router = require("express").Router();

const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Post = require("../models/Post");

// update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).json("you are not authenticated");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been deleted.");
      } catch (error) {
        res.status(403).json(error);
      }
      
    } catch (error) {
      res.status(403).json("user not found.");
    }
  } else {
    res.status(500).json("you can delete only your account.");
  }
});

//get user
router.get("/:id",  async (req, res) => {
 
    try {
      const user = await User.findById(req.params.id);
      const {password, ...other} = user._doc
      res.status(200).json(other);
      
    } catch (error) {
      res.status(403).json("user not found.");
    }

});

module.exports = router;
