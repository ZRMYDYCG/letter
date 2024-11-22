import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    content: { type: String, required: true },
    type: { type: String, required: true },
    color: { type: String, required: true },
    tag: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

const messageModel = mongoose.model("messages", messageSchema)

export default messageModel
