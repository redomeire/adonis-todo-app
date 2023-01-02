'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('home')

Route.get('/testing', () => 'hello world').as('get.hello')

// simplify
// Route.route('/', () => 'ini adalah multiple route', ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
Route.put('/posts/edit', 'TodoController.edit')

Route.get('/posts/search', 'TodoController.search')

Route.get('/posts', 'TodoController.index')

Route.post('/posts', 'TodoController.create')

Route.delete('/posts/:id', 'TodoController.delete')

Route.get('/posts/:id', 'TodoController.getDetail')

Route.post('/posts/create', 'TodoController.create')
