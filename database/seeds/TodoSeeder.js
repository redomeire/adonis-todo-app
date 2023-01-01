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
      {
        name: 'Belajar Adonis',
        description: 'lorem ipsum dolor sit amet',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Belajar Adonis 2',
        description: 'lorem ipsum dolor sit amet',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Belajar Adonis 3',
        description: 'lorem ipsum dolor sit amet',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Belajar Adonis 4',
        description: 'lorem ipsum dolor sit amet',
        created_at: new Date(),
        updated_at: new Date()
      },

    ])
  }
}

module.exports = TodoSeeder
