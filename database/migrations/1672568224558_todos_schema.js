'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TodosSchema extends Schema {
  up () {
    this.create('todos', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.string("name", 60).nullable()
      table.string("description").nullable()
      table.timestamps()
      table.foreign('user_id')
      .references('users.id')
    })
  }

  down () {
    this.drop('todos')
  }
}

module.exports = TodosSchema
