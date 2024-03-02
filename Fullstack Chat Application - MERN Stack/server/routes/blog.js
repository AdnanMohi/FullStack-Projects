const express = require('express')
const { handleGetAllBlogs, handleGetBlogById, handleCreateBlog } = require('../controllers/blog')
const { ensureAuthenticated } = require('../middleware/auth')
const router = express.Router()


// Get all the Blogs
// Public
router.get('/', handleGetAllBlogs)

// Get blog by id
// Public
router.get('/:id', handleGetBlogById)

// Create a new blog
// Protected
router.post('/', ensureAuthenticated, handleCreateBlog)

// Edit blog
// Protected + Authroization?
 router.patch('/:id', ensureAuthenticated)

// Delete the blog by id
// Protected + Authroization?
 router.delete('/:id', ensureAuthenticated)

module.exports = blogRouter