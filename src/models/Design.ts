import mongoose from 'mongoose'

const Schema = new mongoose.Schema({  
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    score: String 
})

export default mongoose.model<IDesignModel>('Design', Schema)

interface IDesignModel extends mongoose.Document {
    category: string,
    title: string,
    project: string,
    thumbnail: string,
    score?: number,    
}
