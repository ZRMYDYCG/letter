import mongoose from "mongoose"

const articleSchema = new mongoose.Schema({
    id: Number,
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
    read: {
        type: Number,
        default: 0
    },
    star: {
        type: Number,
        default: 0
    },
    comment: {
        type: Number,
        default: 0
    },
    author: String,
})

const articleModel = mongoose.model("articles", articleSchema)

export default articleModel
