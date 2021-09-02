import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostLikesController {
  public async update({ params, auth, response }: HttpContextContract) {
    try {
      const post = await Post.findOrFail(params.post_id)
      if (auth.user) {
        await post.related('usersWhoLike').attach([auth.user.id])
      }
    } catch (error) {
      return response.status(400).send({ error: { message: 'post not found' } })
    }
  }
  public async destroy({ params, auth, response }: HttpContextContract) {
    try {
      const post = await Post.findOrFail(params.post_id)
      if (auth.user) {
        await post.related('usersWhoLike').detach([auth.user.id])
      }
    } catch (error) {
      return response.status(400).send({ error: { message: 'post not found' } })
    }
  }
}
