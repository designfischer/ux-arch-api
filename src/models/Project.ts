import mongoose from 'mongoose'

interface IProjectModel extends mongoose.Document {
    owner: string | string[],
    coAuthors?: string[],
    clients?: string[],
    title: string
}

const Schema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    coAuthors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    clients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    title: {
        type: String,
        required: true,
        lowercase: true
    }
})

export default mongoose.model<IProjectModel>('Project', Schema)