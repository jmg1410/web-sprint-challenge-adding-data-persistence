// build your `Task` model here
const db = require('../../data/dbConfig');

async function getTasks() {
  const rows = await db('tasks as t')
    .join('projects as p', 'p.project_id', 't.project_id')
    .select(
      't.task_id',
      't.task_description',
      't.task_notes',
      't.task_completed',
      'p.project_name',
      'p.project_description'
    );

  return rows.map(task => ({
    ...task,
    task_completed: Boolean(task.task_completed),
  }));
}

async function createTask(task) {
    const [id] = await db('tasks').insert(task);
    const row = await db('tasks as t')
      .join('projects as p', 'p.project_id', 't.project_id')
      .select(
        't.task_id',
        't.task_description',
        't.task_notes',
        't.task_completed',
        'p.project_name',
        'p.project_description'
      )
      .where('t.task_id', id)
      .first();
  
    return {
      ...row,
      task_completed: Boolean(row.task_completed),
    };
  }

module.exports = {
  getTasks,
  createTask,
};
