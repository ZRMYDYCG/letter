import type { Context } from 'koa'
import messageModel from "../models/message.model"
interface CreateMessageBody {
    content: string // 留言内容
    userId: string  // 用户ID
    type?: number   // 类型
    color?: string  // 卡片颜色
    tag?: string    // 标签
}

class messageController {
    /*
    * @desc 创建留言
    * */
    async createMessage(ctx: Context) {
        const { content, userId, type, color, tag } = ctx.request.body as CreateMessageBody
        const message = await messageModel.create({ content, userId, type, color, tag })
        ctx.body = {
            code: 200,
            message: '留言创建成功',
            data: message
        }
    }
    /**
     * @desc 获取留言列表或单个留言详情
     * */
    async getMessage(ctx: Context) {
        const { page = 1, pageSize = 10, messageId } = ctx.query as { page?: string; pageSize?: string; messageId?: string }

        try {
            if (messageId) {
                // 当查询单个留言时
                const message = await messageModel.findById(messageId)

                if (!message) {
                    ctx.body = {
                        code: 404,
                        message: '留言不存在',
                        data: null
                    }
                } else {
                    ctx.body = {
                        code: 200,
                        message: '获取留言成功',
                        data: message // 返回单个留言
                    }
                }
            } else {
                // 当查询留言列表时
                const skip = (Number(page) - 1) * Number(pageSize)
                const messages = await messageModel.find().skip(skip).limit(Number(pageSize))
                const total = await messageModel.countDocuments()

                ctx.body = {
                    code: 200,
                    message: '获取留言列表成功',
                    data: messages, // 返回留言列表
                    meta: {
                        pageSize: Number(pageSize),
                        page: Number(page),
                        total: total // 返回总数
                    }
                };
            }
        } catch (err) {
            ctx.body = {
                code: 400,
                error: err.message
            }
        }
    }

    /**
     * @desc 删除留言
     * */
    async deleteMessage(ctx: Context) {
        const { messageId } = ctx.request.query as { messageId: string }

        const message = await messageModel.findByIdAndDelete(messageId)

        ctx.body = {
            code: 200,
            message: '留言删除成功',
            data: message
        }
    }
    /**
     * @desc 举报留言
     * */
}

export default new messageController()
