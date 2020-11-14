import mongoose from 'mongoose'

interface IUserModel extends mongoose.Document {
    email: string,
    password: string,
    role: string,
    firstName?: string,
    lastName?: string,
    thumbnail?: string
}

const Schema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    thumbnail: String,
    role: {
        type: String,
        required: true
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

export default mongoose.model<IUserModel>('User', Schema)