// build your `/api/tasks` router here
const express = require('express');
const Tasks = require('./model');
const db = require('../../data/dbConfig');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const tasks = await Tasks.getTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
    try {
      const { task_description, task_notes, task_completed, project_id } = req.body;
  
      if (!task_description) {
        return res.status(400).json({ message: 'task_description is required' });
      }
  
      if (!project_id) {
        return res.status(400).json({ message: 'project_id is required' });
      }
  
      const project = await db('projects').where('project_id', project_id).first();
      if (!project) {
        return res.status(400).json({ message: 'Invalid project_id' });
      }
  
      const task = await Tasks.createTask({
        task_description,
        task_notes,
        task_completed: task_completed === undefined ? false : task_completed,
        project_id,
      });
  
      res.status(201).json(task);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
