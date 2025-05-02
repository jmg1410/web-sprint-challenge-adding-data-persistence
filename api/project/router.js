// build your `/api/projects` router here
const express = require('express');
const Projects = require('./model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
      const projects = await Projects.getProjects();
      const formatted = projects.map(p => ({
        ...p,
        project_completed: Boolean(p.project_completed),
      }));
      res.json(formatted);
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const { project_name, project_description, project_completed } = req.body;
  
      if (!project_name) {
        return res.status(400).json({ message: 'project_name is required' });
      }
  
      const newProject = await Projects.createProject({
        project_name,
        project_description,
        project_completed: project_completed === undefined ? false : project_completed,
      });
  
      res.status(201).json(newProject);
    } catch (err) {
      next(err);
    }
  });
  
  

module.exports = router;
