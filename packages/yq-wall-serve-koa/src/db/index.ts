import mongoose from "mongoose"
import type { ConnectOptions } from "mongoose"

class Database {
    private readonly connectionString: string;
    private readonly options: ConnectOptions

    constructor() {
        this.connectionString = 'mongodb://localhost:27017/messages-wall'
        this.options = {}
    }

    async connect(): Promise<void> {
        try {
            await mongoose.connect(this.connectionString, this.options)
            console.log("Connected to MongoDB");
        } catch (err) {
            console.log("Error connecting to MongoDB:", err.message)
        }
    }
}

export default new Database()
