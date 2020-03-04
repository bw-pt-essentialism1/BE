
exports.up = function(knex) {

    return (
    knex.schema.createTable('users', tbl => {

        tbl.increments();
        tbl.string('name', 20)
            .notNullable();
        tbl.string('username', 25)
            .notNullable()
            .unique();
        tbl.string('password', 255)
            .notNullable();
        tbl.string('email', 255)
            .notNullable()
            .unique();
        tbl.string('phone', 10)
            .notNullable()
            .unique();
    })
    .createTable('values', tbl => {
        tbl.increments();
        tbl.string('value', 15)
            .notNullable()
            .unique();
    })
    .createTable('projects', tbl=> {
        tbl.increments();
        tbl.string('title', 30)
            .notNullable();
        tbl.string('description', 255)
            .notNullable();
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        
    })
    .createTable('user_values', tbl => {
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        tbl.integer('value_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('values')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        tbl.primary(['user_id', 'value_id'])
    })
    .createTable('user_favorite_values', tbl => {
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        tbl.integer('value_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('values')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        tbl.string('text', 255)
            .notNullable();
        tbl.primary(['user_id', 'value_id', 'text']);
    })
    .createTable('project_values', tbl => {
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        tbl.integer('value_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('values')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        tbl.primary(['project_id', 'value_id']);
    }));
  
};

exports.down = function(knex) {
  return(
      knex.schema
        .dropTableIfExists('project_values')
        .dropTableIfExists('user_favorite_values')
        .dropTableIfExists('user_values')
        .dropTableIfExists('projects')
        .dropTableIfExists('values')
        .dropTableIfExists('users')
  );
};
