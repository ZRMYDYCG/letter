import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    nickname: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    }
})

const userModel = mongoose.model("users", userSchema)

export default userModel
