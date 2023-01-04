'use strict'
const Users = use('App/Models/User')
const Hash = use('Hash')

class UserController {

    async index({ auth, response }) {
        try {
            await auth.check()
            const users = await Users.all()

            return response.status(200).json({ status: 'success', code: 200, data: users })
        } catch (err) {
            if (err.code === 'E_INVALID_JWT_TOKEN')
                return response.status(401).json({ status: 'error', message: err.message })
        }
    }

    async getUserDetail({ auth, request, response }) {
        const { id } = request.params;

        try{
            const user = await auth.getUser()

            const searchedUser = await Users.query().where('id', id).first()

            return response.status(200).json({ status: 'success', code: 200, data: searchedUser })    
        } catch(err) {
            return response.status(401).json({ status: 'error', code: 401, data: err.message }) 
        }
    }

    async create({ auth, request, response }) {
        const body = request.only(['username', 'email', 'password', 'role']);

        let user = new Users();

        user.role = body.role;
        user.username = body.username;
        user.email = body.email;
        user.password = body.password;

        let saved = await user.save();

        try {
            let token = await auth.generate(user);
            return response.status(200).json({ code: 200, status: 'success', message: 'new user created successfully', data: token })
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }

    }

    async login({ auth, request, response }) {
        const body = request.only(['email', 'password'])

        try {
            const user = await Users.findBy('email', body.email)
            const token = await auth.attempt(body.email, body.password);
            return response.status(200).json({ code: 200, status: 'success', data: { user, token } });
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
    }

    async resetPassword({ auth, request, response }) {
        const body = request.only(['old_password', 'new_password'])

        const user = await auth.getUser()
        let newUser = {};
        try {
            const isSame = await Hash.verify(body.old_password, user.password);

            if (isSame) {
                newUser = await Users
                    .query()
                    .where('id', user.id)
                    .update({
                        password: await Hash.make(body.new_password)
                    })
            } else {
                throw response.status(500)
            }

            return response.status(200).json({ status: 'success', code: 200, data: newUser })

        } catch (err) {
            return response.status(500).json({ status: 'error', code: 500, message: err.message })
        }
    }

    async delete({ auth, request, response }) {
        try {
            const body = await request.only(['id'])
            const user = await auth.getUser()
            const newUser = await Users.query().where('id', body.id).first();

            if (newUser !== null && user.role === 'admin') {
                newUser?.delete()

                return response.status(200).json({ status: 'success', code: 200, data: newUser, message: 'success delete account' })
            }

            return response.status(401).json({ status: 'error', code: 401, message: 'only admin can delete accounts' })
        } catch (err) {
            return response.status(500).json({ status: 'error', code: 500, message: err.message })
        }

    }
}

module.exports = UserController
