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

Route.get('/', () => 'hello world').as('get.hello')

// simplify
// Route.route('/', () => 'ini adalah multiple route', ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
Route.put('/posts/edit', 'TodoController.edit').middleware('auth')

Route.get('/posts/search', 'TodoController.search').middleware('auth')

Route.get('/posts', 'TodoController.index').middleware('auth')

Route.get('/posts/all', 'TodoController.getAllTodos').middleware('auth')

Route.post('/posts', 'TodoController.create').middleware('auth')

Route.delete('/posts/:id', 'TodoController.delete').middleware('auth')

Route.get('/posts/:id', 'TodoController.getDetail').middleware('auth')

Route.post('/posts/create', 'TodoController.create').middleware('auth')

// authenticate
Route.get('users', 'UserController.index')
Route.get('users/detail/:id', 'UserController.getUserDetail').middleware('auth')
Route.post('register', 'UserController.create').middleware('guest')
Route.post('login', 'UserController.login').middleware('guest')
Route.put('password-reset', 'UserController.resetPassword').middleware('auth')
Route.delete('delete', 'UserController.delete').middleware('auth')

