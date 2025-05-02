// build your `Project` model here
const db = require('../../data/dbConfig');

function getProjects() {
    return db('projects').then(projects => 
        projects.map(p => ({
            ...p,
            project_completed: Boolean(p.project_completed)
        }))
    );
}

function createProject(project) {
    return db('projects').insert(project)
      .then(([id]) => db('projects').where('project_id', id).first())
      .then(project => ({
          ...project,
          project_completed: Boolean(project.project_completed)
      }));
}


module.exports = {
  getProjects,
  createProject,
};
