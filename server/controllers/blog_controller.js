const Blog = require("../models/blog_model");
const upload = require("../uploads");
const path = require("path");

// *******************
// Get all blogs
// *******************

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

// ***************************
// Get a single blog post by ID
// ****************************

exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// *******************
// Create New Blog
// *******************

exports.createBlog = async (req, res) => {
  const { title, content,short_desc } = req.body;
  if (req.file) {
    imageUrl = `${process.env.SERVER_URL}/Images/${path.basename(req.file.path)}`;
  } else {
    imageUrl = null; // Handle cases where no file is uploaded
  }
  const newBlog = new Blog({
    title,
    content,
    short_desc,
    image:imageUrl,
  });
  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// *******************
// Update Blog
// *******************

exports.updatedBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// *******************
// Delete Blog
// *******************

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
