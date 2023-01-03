'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class UserSeeder {
  async run () {
    await Database.table('users')
    .insert([
      {
        username: 'redoxx',
        email: 'redomeire@gmail.com',
        password: '12345',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  }
}

module.exports = UserSeeder
