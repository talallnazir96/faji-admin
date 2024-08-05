const express = require("express");

const router = express.Router();

const blogController = require("../controllers/blog_controller");

router.route("/").get( blogController.getAllBlogs);

router.route("/:id").get( blogController.getSingleBlog);

router.route("/").post( blogController.createBlog);

router.route("/:id").put( blogController.updatedBlog);

router.route("/:id").delete( blogController.deleteBlog);

module.exports = router;