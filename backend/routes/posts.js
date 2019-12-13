const Post = require("../models/post");

const express = require("express");
const router = express.Router();

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log("This is the post from the client");
  console.log(post);
  post.save().then(result => {
    res.status(201).json({
      message: "Post added successfully",
      postId: result._id
    });
  });
});

router.get("", (req, res, next) => {
  Post.find().then(documents => {
    console.log(documents);

    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  console.log("Inside get. Params:");
  console.log(req.params.id);
  Post.findOne({ _id: req.params.id }).then(postFetched => {
    console.log(postFetched);
    res.status(200).json({ message: "Post fetched!", post: postFetched });
  });
});

// update a post whose id is passed as param
router.put("/:id", (req, res, next) => {
  console.log("Inside update post.");

  const updatedPost = {
    title: req.body.title,
    content: req.body.content
  };

  const filter = { _id: req.body.id };

  Post.findOneAndUpdate(filter, updatedPost).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post updated!" });
  });
});

router.delete("/:id", (req, res, next) => {
  console.log(req.params.id);

  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
