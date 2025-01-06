import type { Context } from 'koa'
import messageModel from "../models/message.model"

interface CreateMessageBody {
    content: string // 留言内容
    userId: string  // 用户ID
    type?: number   // 类型
    color?: string  // 卡片颜色
    tag?: string    // 标签
    nickName?: string // 用户的留言昵称
    image?: string  // 留言图片
}

class messageController {
    /*
    * @desc 创建文本留言
    * */
    async createMessage(ctx: Context) {
        const { content, userId, type, color, tag, nickName, image } = ctx.request.body as CreateMessageBody
        const message = await messageModel.create({ content, userId, type, color, tag, nickName, image })
        ctx.body = {
            code: 200,
            message: '留言创建成功',
            data: message
        }
    }
    /**
     * @desc 获取留言列表或单个留言详情或某用户的留言列表或某用户的某标签的留言列表
     * page: 当前页码（可选，默认为1）
     * pageSize: 每页显示的数量（可选，默认为10）
     * messageId: 用于获取单个留言的ID（可选）
     * userId: 根据用户ID过滤留言（可选）
     * tag: 根据标签过滤留言（可选）
     * type: 根据留言类型过滤（可选）
     * sortBy: 排序方式，可以是 'createdAt'、'like' 或 'comment'（可选）
     * */
    async getMessage(ctx: Context) {
        const { page = 1, pageSize = 10, messageId, userId, tag, type, sortBy } = ctx.query as {
            page?: string;
            pageSize?: string;
            messageId?: string;
            userId?: string;
            tag?: string;
            type?: number;
            sortBy?: 'createdAt' | 'like' | 'comment';
        };

        console.log(page, pageSize, messageId, userId, tag, type, sortBy)

        try {
            if (messageId) {
                // 单个留言查询
                const message = await messageModel.findById(messageId);

                if (!message) {
                    ctx.body = {
                        code: 404,
                        message: '留言不存在',
                        data: null
                    };
                } else {
                    ctx.body = {
                        code: 200,
                        message: '获取留言成功',
                        data: message // 返回单个留言
                    };
                }
            } else {
                // 留言列表查询
                const skip = (Number(page) - 1) * Number(pageSize);
                const query: any = {};

                if (type) {
                    query.type = type; // 根据留言类型过滤
                }

                if (userId) {
                    query.userId = userId; // 根据用户ID过滤
                }

                if (tag) {
                    query.tag = tag; // 根据标签过滤
                }

                // 根据 sortBy 参数选择排序字段
                const sortField = sortBy === 'like' ? { like: -1 } : sortBy === 'comment' ? { comment: -1 } : { createdAt: -1 };

                // @ts-ignore
                const messages = await messageModel.find(query).sort(sortField).skip(skip).limit(Number(pageSize));
                const total = await messageModel.countDocuments(query);

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
            };
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
    /*
    * @desc 点赞留言
    * */
    async likeMessage(ctx: Context) {
        const { messageId } = ctx.request.body as { messageId: string }
        const userId = ctx.state.user._id // 获取当前用户ID

        try {
            const message = await messageModel.findById(messageId)
            if (!message) {
                ctx.body = {
                    code: 404,
                    message: '留言不存在',
                    data: null
                }
                return
            }

            // 检查用户是否已点赞
            if (message.likedBy.includes(userId)) {
                ctx.body = {
                    code: 400,
                    message: '您已经点赞过此留言',
                    data: null
                }
                return
            }

            // 更新留言的点赞数和点赞用户列表
            message.like += 1
            message.likedBy.push(userId)
            await message.save()

            ctx.body = {
                code: 200,
                message: '点赞成功',
                data: message
            }
        } catch (err) {
            ctx.body = {
                code: 400,
                error: err.message
            }
        }
    }
    /*
    * @desc 取消点赞
    * */
    async unlikeMessage(ctx: Context) {
        const { messageId } = ctx.request.body as { messageId: string }
        const userId = ctx.state.user._id // 获取当前用户ID

        try {
            const message = await messageModel.findById(messageId)
            if (!message) {
                ctx.body = {
                    code: 404,
                    message: '留言不存在',
                    data: null
                }
                return
            }

            // 检查用户是否已点赞
            if (!message.likedBy.includes(userId)) {
                ctx.body = {
                    code: 400,
                    message: '您尚未点赞此留言',
                    data: null
                }
                return
            }

            // 更新留言的点赞数和点赞用户列表
            message.like -= 1
            message.likedBy = message.likedBy.filter(id => id.toString() !== userId)
            await message.save()

            ctx.body = {
                code: 200,
                message: '取消点赞成功',
                data: message
            }
        } catch (err) {
            ctx.body = {
                code: 400,
                error: err.message
            }
        }
    }
    /**
     * @desc 举报留言
     * */
}

// @ts-ignore
export default new messageController()
