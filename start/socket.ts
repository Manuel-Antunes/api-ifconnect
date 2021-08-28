import ChatMessage from 'App/Schemas/ChatMessage'
import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  const id = socket.handshake.query.id
  socket.join(id as string)
  socket.on('send-message', async ({ recipients, text }: { recipients: any[]; text: string }) => {
    const message = await ChatMessage.create({
      chatId: recipients.join(','),
      message: text,
      userId: parseInt(id as string, 10),
    })
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient)
      newRecipients.push(id)
      socket.broadcast.to(recipient).emit('recieve-message', message)
    })
  })
})
