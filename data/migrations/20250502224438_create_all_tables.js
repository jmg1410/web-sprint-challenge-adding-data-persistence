
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('projects', table => {
      table.increments('project_id');
      table.string('project_name').notNullable();
      table.string('project_description');
      table.boolean('project_completed').notNullable().defaultTo(false); // or .defaultTo(0)
    });
  
    await knex.schema.createTable('resources', table => {
      table.increments('resource_id');
      table.string('resource_name').notNullable().unique();
      table.string('resource_description');
    });
  
    await knex.schema.createTable('tasks', table => {
      table.increments('task_id');
      table.string('task_description').notNullable();
      table.string('task_notes');
      table.boolean('task_completed').notNullable().defaultTo(false); // or .defaultTo(0)
      table
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('CASCADE')  // Optional: if project is deleted, delete related tasks
        .onUpdate('CASCADE');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('tasks');
    await knex.schema.dropTableIfExists('resources');
    await knex.schema.dropTableIfExists('projects');
  };
  









