'use strict'
const Todos = use('App/Models/Todo');

class TodoController {

    async index({ auth, request, response }) {
        try {
            const user = await auth.getUser()
            const query = request.get();
    
            const todos = await Todos.query()
            .where('user_id', user.id)
            .paginate(query.page, 10);
    
            return todos.toJSON()
        } catch(err){
            return response.status(401).json({ status: 'error', code: 401, message: err.message })
        }
    }

    async getAllTodos({ auth, response }) {
        try {
            const user = await auth.getUser()
            const todos = await Todos.all();

            if(user.role !== 'admin')
                throw response.status(401).json({ status: 'error', code: 401 })

                return response.status(200).json({ status: 'success', code: 200, data: todos })
        } catch(err) {
            return response.status(401).json({ status: 'error', code: 401, message: err.message })
        }
    }

    async create({ auth, request, response }) {
        const body = request.only(['name', 'description'])

        try {
            const user = await auth.getUser();
            const newTodo = new Todos()
            // const newTodo = await Todos.create(body)
            newTodo.user_id = user.id;
            newTodo.name = body.name;
            newTodo.description = body.description

            const saved = newTodo.save();

            return response.status(200).json({
                code: 200,
                status: 'success',
                data: newTodo
            })
        } catch (err) {
            return response.status(401).json({
                code: 401,
                status: 'error',
                data: err.message
            })
        }
    }

    async getDetail({ auth, request, response }) {
        const { id } = request.params;
        try{
            const user = await auth.getUser();
            const searchedTodo = await Todos.find(id);
    
            return response.status(200).json({ status: 'success', code: 200, data: searchedTodo })
        } catch(err) {
            return response.status(401).json({ status: 'error', code: 401, message: err.message })
        }
    }

    async edit({ auth, request, response }) {
        const body = request.only(['id', 'name', 'description'])

        try {
            const user = await auth.getUser()

            await Todos
                .query()
                .where('id', body.id)
                .where('user_id', user.id)
                .update({
                    name: body.name,
                    description: body.description
                });

                return response.status(200).json({ code: 200, status: 'success', message: 'todo updated' })
        } catch(err) {
            return response.status(401).json({ code: 401, status: 'error', message: err.message })
        }
    }

    async delete({ auth, request, response }) {
        const { id } = request.params;

        try {
            const user = await auth.getUser();

            const todo = await Todos.query().where('id', id).where('user_id', user.id).first()
            
            if(todo !== null)
                todo?.delete()

                else throw "data not found"

            return response.status(200).json({ code: 200, status: 'success', data: todo })
        } catch (err) {
            return response.status(401).json({ code: 401, status: 'error', message: err.message })
        }

    }

    async search({ auth, request, response }){
        const query = request.get();

        try{
            const user = await auth.getUser()

            const todos = await Todos
            .query()
            .where('user_id', user.id)
            .where('name', 'LIKE', `%${query.q}%`)
            .paginate(query.page, 2)

            return response.status(200).json({ code: 200, status: 'success', data: todos })
        } catch(err) {
            return response.status(401).json({ code: 401, status: 'error', message: err.message })
        }
    }
}

module.exports = TodoController
