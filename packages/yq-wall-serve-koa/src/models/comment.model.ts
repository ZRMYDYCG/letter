import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    /* 评论用户ID */
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    /* 当前评论关联的留言ID */
    messageId: { type: mongoose.Schema.Types.ObjectId, ref: 'messages', required: true },
    /* 评论用户签名 */
    nickName: { type: String, default: "" },
    /* 评论内容 */
    content: { type: String, required: true },
    /* 评论时间 */
    createdAt: { type: Date, default: Date.now }
})

const commentModel = mongoose.model("comments", commentSchema)

export default commentModel
