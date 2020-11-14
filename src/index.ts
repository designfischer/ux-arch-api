import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
require('dotenv').config()

import routes from './routes'
import connectToDatabase from './database'

const app = express()

connectToDatabase()

app.use(cors())
app.use(express.json())
app.use(routes)

const PORT = 3333 || process.env.PORT

app.listen(PORT, () => console.log('Server running'))