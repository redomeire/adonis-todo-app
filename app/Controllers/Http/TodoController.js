'use strict'
const Todos = use('App/Models/Todo');

class TodoController {
    
    async index() {
        const todos = await Todos.query().paginate(1, 10);

        return {
            data: todos
        }
    }

    async create({ request, response }){
        const body = request.only(['name', 'description'])

        try {
            const newTodo = await Todos.create(body)

            return response.status(200).json({
                code: 200,
                status: 'success',
                data: newTodo
            })
        } catch(err){
            return response.status(500).json({
                code: 500,
                status: 'error',
                data: err.message
            })
        }
    }

    async getDetail({ request }){
        const { id } = request.params;

        const searchedTodo = await Todos.find(id);

        return {
            data: searchedTodo
        }
    }

    async delete({ request, response }){
        const { id } = request.params;

        // console.log(body)

        try {
            const todo = await Todos.find(id);
            todo?.delete()
    
            return response.status(200).json({ code: 200, status: 'success', data: todo })
        } catch(err){
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }

        // return response.redirect().toPath('/')
    }
}

module.exports = TodoController
