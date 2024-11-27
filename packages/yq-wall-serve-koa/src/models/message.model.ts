import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    /*留言用户ID*/
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    /*留言用户签名*/
    nickName: { type: String, default: "" },
    /*留言内容*/
    content: { type: String, required: true },
    /*留言类型*/
    type: { type: Number, required: true },
    /*背景色*/
    color: { type: Number, required: true },
    /*背景图*/
    image: { type: String, default: "" },
    /*标签*/
    tag: { type: String, required: true },
    /*点赞数*/
    like: { type: Number, default: 0 },
    /*点赞用户列表*/
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users', default: [] }],
    /*评论数*/
    comment: { type: Number, default: 0 },
    /*留言发布时间*/
    createdAt: { type: Date, default: Date.now }
})

const messageModel = mongoose.model("messages", messageSchema)

export default messageModel
