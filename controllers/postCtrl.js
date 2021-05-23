const Posts = require("../models/postModel");
const Comments = require('../models/commentModel')
const Users = require('../models/userModel')

const postCtrl = {
  createPost: async (req, res) => {
    try {
      const { content, images } = req.body;

      if (images.length === 0)
        return res.status(400).json({ msg: "Add a picture please" });
      const newPost = new Posts({
        content,
        images,
        user: req.user._id,
      });
      await newPost.save();
      res.json({
        msg: "Create Post!",
        newPost,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPosts: async (req, res) => {
    try {
      const posts = await Posts.find({
        user: [...req.user.friends, req.user._id],
      })
        .sort("-createdAt")
        .populate("user likes", "avatar username fullname")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });
      res.json({
        msg: "Success!",
        result: posts.length,
        posts,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      const { content, images } = req.body;
      const post = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        { content, images }
      ).populate("user likes", "avatar username fullname")
      .populate({
        path: "comments",
        populate: {
          path: "user likes",
          select: "-password",
        },
      })
      res.json({
        msg: "Post Updated",
        newPost: {
          ...post._doc,
          content,
          images,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  likePost: async (req, res) => {
    try {
      const post = await Posts.find({
        _id: req.params.id,
        likes: req.user._id,
      });

      if (post.length > 0)
        return res.status(400).json({ msg: "You liked this already!" });

      const like = await Posts.findOneAndUpdate({ _id: req.params.id },{
          $push: { likes: req.user._id },
        },{ new: true });
      if(!like)return res.status(500).json({ msg: "Post not found" });

      res.json({ msg: "Liked a Post!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unLikePost: async (req, res) => {
    try {
      const like = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );
      if(!like) return res.status(500).json({ msg: "Post not found" });
      res.json({ msg: "unLiked a Post!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserPosts: async (req, res) => {
    try {
      const posts = await Posts.find({user : req.params.id})
      .sort("-createdAt")
      res.json({
        posts,
      result: posts.length})

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id)
      .populate("user likes", "avatar username fullname")
      .populate({
        path: "comments",
        populate: {
          path: "user likes",
          select: "-password",
        },
      });

      if(!post) return res.status(500).json({ msg: "Post not found" });

      res.json({post})

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deletePost: async (req, res) => {
    try {
      const post = await Posts.findOneAndDelete({_id: req.params.id, user: req.user._id})
      await Comments.deleteMany({_id: {$in: post.comments}})

      res.json({msg: 'Deleted Post!'})
      
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  savePost: async (req, res) => {
    try {
      const user = await Users.find({_id: req.user._id, saved: req.params.id,});

      if (user.length > 0)
        return res.status(400).json({ msg: "You saved this already!" });

      const save = await Users.findOneAndUpdate({ _id: req.user._id },{
          $push: { saved: req.params.id },
        },{ new: true });
      if(!save)return res.status(500).json({ msg: "User not found" });

      res.json({ msg: "Saved a Post!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unSavePost: async (req, res) => {
    try {
      const save = await Users.findOneAndUpdate({ _id: req.user._id },{
          $pull: { saved: req.params.id },
        },{ new: true });
      if(!save)return res.status(500).json({ msg: "User not found" });

      res.json({ msg: "unSaved a Post!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};
module.exports = postCtrl;
