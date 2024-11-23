import userModel from '../models/users.model'
import jwt from 'jsonwebtoken'

class authService {
    async login(username: string, password: string) {
        const res = await userModel.findOne({username, password})
        const token = jwt.sign({res}, 'yq-yq-message-wall-server-jwt', {expiresIn: '24h'})
        if(res) {
            return {token, user: res}
        }
    }
}

export default new authService()
