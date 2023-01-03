'use strict'
const Users = use('App/Models/User')

class UserController {

    async create({ auth, request, response }){
        const body = request.only(['username', 'email', 'password']);

        let user = new Users();

        user.username = body.username;
        user.email = body.email;
        user.password = body.password;

        let saved = await user.save();

        try{
            let token = await auth.generate(user);
            return response.status(200).json({ code: 200, status: 'success', message: 'new user created successfully', data: token })
        } catch(err){
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }

    }

    async login({ auth, request, response }){
        const body = request.only(['email', 'password'])
        
        try{
            const user = Users.findBy('email', body.email)
            const token = await auth.attempt(body.email, body.password);
            return response.status(200).json({ code: 200, status: 'success', data: token });
        } catch(err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
    }
}

module.exports = UserController
