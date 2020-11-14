import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URL!

function connectToDatabase() {
    mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, () => console.log('Connected to database'))
}

export default connectToDatabase