'use strict'
const Todos = use('App/Models/Todo');

class TodoController {

    async index({ request }) {
        const query = request.get();
        const todos = await Todos.query().paginate(query.page, 10);

        return todos.toJSON()
    }

    async create({ request, response }) {
        const body = request.only(['name', 'description'])

        try {
            const newTodo = await Todos.create(body)

            return response.status(200).json({
                code: 200,
                status: 'success',
                data: newTodo
            })
        } catch (err) {
            return response.status(500).json({
                code: 500,
                status: 'error',
                data: err.message
            })
        }
    }

    async getDetail({ request }) {
        const { id } = request.params;

        const searchedTodo = await Todos.find(id);

        return {
            data: searchedTodo
        }
    }

    async edit({ request, response }) {
        const body = request.only(['id', 'name', 'description'])

        try {
            await Todos
                .query()
                .where('id', body.id)
                .update({
                    name: body.name,
                    description: body.description
                });

                return response.status(200).json({ code: 200, status: 'success', message: 'todo updated' })
        } catch(err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
    }

    async delete({ request, response }) {
        const { id } = request.params;

        try {
            const todo = await Todos.find(id);
            todo?.delete()

            return response.status(200).json({ code: 200, status: 'success', data: todo })
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }

    }

    async search({ request, response }){
        const query = request.get();

        try{
            const todos = await Todos
            .query()
            .where('name', 'LIKE', `%${query.q}%`)
            .paginate(query.page, 2)

            return response.status(200).json({ code: 200, status: 'success', data: todos })
        } catch(err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
    }
}

module.exports = TodoController
