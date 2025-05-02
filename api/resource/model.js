// build your `Resource` model here
const db = require('../../data/dbConfig');

async function getResources() {
  return db('resources');
}

async function createResource(resource) {
  const [id] = await db('resources').insert(resource);
  return db('resources').where('resource_id', id).first();
}

module.exports = {
  getResources,
  createResource,
};
