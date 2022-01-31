import * as mongoose from 'mongoose'

interface Message {
  room: String
  date: Date
  from: String
  content: String
}

const schema = new mongoose.Schema<Message>({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  from: String,
  content: String,
})

export default mongoose.model<Message>('Message', schema)
