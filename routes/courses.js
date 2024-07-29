const express = require("express")
const router = express.Router()
const Course = require('../model/course');
const Section = require('../model/section');
const Video = require('../model/video');
const parser = require('../Cloudinary');

router.get('/', async (req, res) => {
    try {
      const courses = await Course.find().populate('sections');
      res.render('courses/courses', { courses });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  router.post('/courses', parser.single('thumbnail'), async (req, res) => {
    const { title, description, price } = req.body;
    const thumbnail = req.file.path;
    try {
      const newCourse = new Course({ title, description, price, thumbnail });
      const savedCourse =router.post('/courses', parser.single('thumbnail'), async (req, res) => {
  const { title, description, price } = req.body;
  const thumbnail = req.file.path;
  try {
    const newCourse = new Course({ title, description, price, thumbnail });
    const savedCourse = await newCourse.save();
    res.json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific course by ID
router.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate({
      path: 'sections',
      populate: {
        path: 'videos'
      }
    });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a course by ID
router.put('/courses/:id', async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a course by ID
router.delete('/courses/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new section for a course
router.post('/courses/:courseId/sections', async (req, res) => {
  const { title } = req.body;
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    const newSection = new Section({ title, course: course._id });
    const savedSection = await newSection.save();
    course.sections.push(savedSection._id);
    await course.save();
    res.json(savedSection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new video for a section
router.post('/sections/:sectionId/videos', parser.single('video'), async (req, res) => {
  const { title, caption } = req.body;
  const url = req.file.path;
  try {
    const section = await Section.findById(req.params.sectionId);
    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }
    const newVideo = new Video({ title, url, caption, section: section._id });
    const savedVideo = await newVideo.save();
    section.videos.push(savedVideo._id);
    await section.save();
    res.json(savedVideo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); await newCourse.save();
      res.json(savedCourse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get a specific course by ID
  router.get('/courses/:id', async (req, res) => {
    try {
      const course = await Course.findById(req.params.id).populate({
        path: 'sections',
        populate: {
          path: 'videos'
        }
      });
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a course by ID
  router.put('/courses/:id', async (req, res) => {
    try {
      const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedCourse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a course by ID
  router.delete('/courses/:id', async (req, res) => {
    try {
      await Course.findByIdAndDelete(req.params.id);
      res.json({ message: 'Course deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Create a new section for a course
  router.post('/courses/:courseId/sections', async (req, res) => {
    const { title } = req.body;
    try {
      const course = await Course.findById(req.params.courseId);
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      const newSection = new Section({ title, course: course._id });
      const savedSection = await newSection.save();
      course.sections.push(savedSection._id);
      await course.save();
      res.json(savedSection);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Create a new video for a section
  router.post('/sections/:sectionId/videos', parser.single('video'), async (req, res) => {
    const { title, caption } = req.body;
    const url = req.file.path;
    try {
      const section = await Section.findById(req.params.sectionId);
      if (!section) {
        return res.status(404).json({ error: 'Section not found' });
      }
      const newVideo = new Video({ title, url, caption, section: section._id });
      const savedVideo = await newVideo.save();
      section.videos.push(savedVideo._id);
      await section.save();
      res.json(savedVideo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = router