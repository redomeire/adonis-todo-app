'use strict'

/*
|--------------------------------------------------------------------------
| TodoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class TodoSeeder {
  async run () {
    const todos = await Database.table('todos')
    .insert([
    ])
  }
}

module.exports = TodoSeeder
