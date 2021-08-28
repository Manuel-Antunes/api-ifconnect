import Mongo from '@ioc:Adonis/Addons/Mongo'
import ChatMessage from 'Contracts/interfaces/ChatMessage'

const ChatMessageSchema = new Mongo.Schema<ChatMessage>(
  {
    chatId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default Mongo.model<ChatMessage>('ChatMessage', ChatMessageSchema)
