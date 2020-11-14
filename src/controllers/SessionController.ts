import { Request, Response } from 'express'
import User from '../models/User'

const SessionController = {
    async login(req: Request, res: Response) {
        const { email, password } = req.body
        try {
            const user = await User.findOne({ email: email })            
            if (!user) return res.status(404).json({ message: 'User not found' })
            if (user.password !== password) return res.status(403).json({ message: 'Unauthorized' })
            return res.status(200).json({ user, authorized: true })
        } catch(err) {
            return res.status(500).json(err)
        }
    }
}

export default SessionController