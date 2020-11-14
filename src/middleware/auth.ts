import { Request, Response, NextFunction } from 'express'

export function authorize(req: Request, res: Response, next: NextFunction) {
    const { user_id } = req.headers
    if (!user_id) return res.status(403).json({ message: 'No Authorization Token' })
    req.userId = user_id as string
    next()
}
