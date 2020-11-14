import { Request, Response } from 'express'

import User from '../models/User'

const UserController = {
    async createUser(req: Request, res: Response) {
        const reqBody: ICreateUserRequest = req.body
        try {
            const hasUser = await User.findOne({ email: reqBody.email })
            if (hasUser) return res.status(400).json({ message: 'User already exists' })
            const user = await User.create(reqBody)
            return res.status(201).json(user)
        } catch(err) {
            return res.status(500).json(err)
        }
    },
    async deleteUser(req: Request, res: Response) {
        const { user_email } = req.params
        try {
            const deletedUser = await User.findOneAndDelete({ email: user_email })
            if (!deletedUser) return res.status(404).json({ message: 'User not found' })
            return res.status(200).json({ message: 'User deleted successfully', deletedUser })
        } catch(err) {
            return res.status(500).json(err)
        }
    },
    async getUserByEmail(req: Request, res: Response) {
        const { user_email } = req.params
        try {
            const user = await User.findOne({ email: user_email })
            if (!user) return res.status(404).json({ message: 'User not found' })
            return res.status(200).json(user)
        } catch(err) {
            return res.status(500).json(err)
        }
    },
    async getUsers(req: Request, res: Response) {
        try {
            const users = await User.find()
            if (!users) return res.status(404).json({ message: 'No users found' })
            return res.status(200).json(users)
        } catch(err) { 
            return res.status(500).json(err)
        }
    }
}

export default UserController