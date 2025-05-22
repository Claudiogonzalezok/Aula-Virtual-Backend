// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.Controller');

router.post('/', courseController.createCourse);
router.get('/', courseController.getCourses);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
