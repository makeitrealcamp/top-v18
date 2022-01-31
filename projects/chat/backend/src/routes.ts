import express, { NextFunction, Request, Response } from 'express'
import Message from './models/Message'
import Room from './models/Room'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.json({ status: 'success' })
})

router.get('/rooms', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rooms = await Room.find({})
    res.json(rooms)
  } catch (e) {
    next(e)
  }
})

router.get('/rooms/:id/messages', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const messages = await Message.find({ room: id })
    res.json(messages)
  } catch (e) {
    next(e)
  }
})

router.post('/rooms/:id/messages', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const message = await Message.create({ ...req.body, room: id })
    res.json(message)
  } catch (e) {
    next(e)
  }
})

export default router
