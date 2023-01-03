'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique().defaultTo('user')
      table.string('email', 254).notNullable().unique().defaultTo('email@gmail.com')
      table.string('password', 60).notNullable().defaultTo('12345')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
