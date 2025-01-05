import type { Context } from 'koa';
import commentModel from "../models/comment.model";
import messageModel from "../models/message.model";

class commentController {
    /*
    * @desc 给某条留言添加评论
    * */
    async createComment(ctx: Context) {
        const { content, messageId, userId } = ctx.request.body as any;
        const comment = await commentModel.create({ content, messageId, userId });
        await messageModel.findByIdAndUpdate(messageId, { $inc: { comment: 1 } });
        ctx.body = {
            success: true,
            data: comment
        };
    }

    /**
     * @desc 给某条评论追加回复
     * */
    async replyToComment(ctx: Context) {
        const { content, commentId, userId } = ctx.request.body as any;

        try {
            // 找到父评论
            const parentComment = await commentModel.findById(commentId);
            if (!parentComment) {
                ctx.body = {
                    code: 404,
                    message: '评论不存在',
                    data: null
                };
                return;
            }

            // 创建回复评论，并设置 parentId
            const replyComment = await commentModel.create({
                content,
                messageId: parentComment.messageId,
                userId,
                parentId: commentId // 设置父评论ID
            });

            // 将回复的评论ID添加到父评论的 replies 数组中
            parentComment.replies.push(replyComment._id);
            await parentComment.save();

            ctx.body = {
                success: true,
                data: replyComment
            };
        } catch (err) {
            ctx.body = {
                code: 400,
                error: err.message
            };
        }
    }

    /**
     * @desc 获取留言的评论列表
     * */
    async getCommentsByMessageId(ctx: Context) {
        const { page = 1, pageSize = 10, messageId } = ctx.query as { page?: string; pageSize?: string; messageId: string };

        try {
            if (!messageId) {
                ctx.body = {
                    code: 400,
                    message: '缺少留言ID',
                    data: null
                };
                return;
            }

            // 查询评论的条件
            const skip = (Number(page) - 1) * Number(pageSize);
            const query = { messageId, parentId: null } as any; // 只获取顶级评论

            // 查询父级评论，按留言ID
            const comments = await commentModel.find(query)
                .skip(skip)
                .limit(Number(pageSize))
                .populate({
                    path: 'userId',
                    select: 'username avatar nickname',
                    model: 'users',
                });

            // 针对每条父评论查询其对应的回复
            const modifiedComments = await Promise.all(comments.map(async (comment) => {
                const populatedComment = await comment.populate({
                    path: 'replies',
                    populate: {
                        path: 'userId',
                        select: 'username avatar nickname',
                        model: 'users',
                    }
                });

                return {
                    ...populatedComment.toObject(),
                    user: populatedComment.userId,
                    replies: populatedComment.replies.map((reply: any) => ({
                        ...reply.toObject(),
                        user: reply.userId,
                        userId: undefined,
                    })) || [],
                    userId: undefined,
                };
            }));

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
            };
        } catch (err) {
            ctx.body = {
                code: 400,
                error: err.message
            };
        }
    }

}

export default new commentController();
