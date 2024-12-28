import userModel from '../models/users.model';
import jwt from 'jsonwebtoken';

class authService {
    async login(username: string, password: string, identity: number, ipAddress: string) {
        let res;

        // 如果是游客登录，则不验证密码，返回一个默认的 token
        if (identity === 3) {
            // 检查是否已经存在该 IP 地址的游客用户
            res = await userModel.findOne({ username: ipAddress });

            if (!res) {
                // 如果不存在，则创建一个新的游客用户
                const guestUser = { username: ipAddress, identity: 3 , password: ipAddress };
                await userModel.create(guestUser); // 将游客 IP 地址作为用户保存
                res = guestUser; // 使用新创建的游客用户
            }

            const token = jwt.sign({ user: res }, 'yq-yq-message-wall-server-jwt', { expiresIn: '24h' });

            return { token, user: res }; // 返回游客的用户信息和 token
        } else {
            // 对于普通用户登录，验证用户名和密码
            res = await userModel.findOne({ username, password });

            if (res) {
                // 密码正确，生成 token
                const token = jwt.sign({ user: res }, 'yq-yq-message-wall-server-jwt', { expiresIn: '24h' });
                return { token, user: res };
            } else {
                // 处理用户未找到或密码错误的情况
                // @ts-ignore
                throw new Error("用户名或密码错误", res);
            }
        }
    }
}

export default new authService();