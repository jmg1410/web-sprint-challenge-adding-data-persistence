// build your `/api/resources` router here
const express = require('express');
const Resources = require('./model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const resources = await Resources.getResources();
    res.json(resources);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { resource_name, resource_description } = req.body;

    if (!resource_name) {
      return res.status(400).json({ message: 'resource_name is required' });
    }

    const resource = await Resources.createResource({ resource_name, resource_description });
    res.status(201).json(resource);
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ message: 'resource_name must be unique' });
    }
    next(err);
  }
});

module.exports = router;
