import { Document } from 'mongoose'

export default interface ChatMessage extends Document {
  chatId: string
  message: string
  userId: number
}
