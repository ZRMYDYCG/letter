import type { Context } from 'koa'
import commentModel from "../models/comment.model"
import messageModel from "../models/message.model"

class commentController {
    /*
    * @desc 给某条留言添加评论
    * */
    async createComment(ctx: Context) {
        const { content, messageId, userId } = ctx.request.body as any
        const comment = await commentModel.create({ content, messageId, userId })
        await messageModel.findByIdAndUpdate(messageId, { $inc: { comment: 1 } })
        ctx.body = {
            success: true,
            data: comment
        }
    }

    /**
     * @desc 获取留言的评论列表
     * */
    async getCommentsByMessageId(ctx: Context) {
        const { page = 1, pageSize = 10, messageId } = ctx.query as { page?: string; pageSize?: string; messageId: string }

        try {
            if (!messageId) {
                ctx.body = {
                    code: 400,
                    message: '缺少留言ID',
                    data: null
                }
                return;
            }

            // 查询评论的条件
            const skip = (Number(page) - 1) * Number(pageSize)
            const query = { messageId }

            // 查询评论并进行分页，同时关联用户信息
            const comments = await commentModel.find(query)
                .skip(skip)
                .limit(Number(pageSize))
                .populate({
                    path: 'userId',
                    select: 'username avatar',
                    model: 'users',
                });

            const modifiedComments = comments.map(comment => {
                return {
                    ...comment.toObject(),
                    user: comment.userId,
                    userId: undefined,
                }
            });

            const total = await commentModel.countDocuments(query);

            ctx.body = {
                code: 200,
                message: '获取评论列表成功',
                data: modifiedComments,
                meta: {
                    pageSize: Number(pageSize),
                    page: Number(page),
                    total: total
                }
            }
        } catch (err) {
            ctx.body = {
                code: 400,
                error: err.message
            }
        }
    }
}

export default new commentController()
