import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import StoreValidator from 'App/Validators/Post/StoreValidator'
import UpdateValidator from 'App/Validators/Post/UpdateValidator'

export default class PostsController {
  public async index({ request }: HttpContextContract) {
    const { limit, offset = 1 } = request.qs()
    const posts = limit
      ? await Post.query()
        .whereDoesntHave('classroom', () => { // eslint-disable-line prettier/prettier
          return // eslint-disable-line prettier/prettier
        }) // eslint-disable-line prettier/prettier
        .paginate(offset, limit) // eslint-disable-line prettier/prettier
      : await Post.query().whereDoesntHave('classroom', () => { // eslint-disable-line prettier/prettier
        return // eslint-disable-line prettier/prettier
      }) // eslint-disable-line prettier/prettier
    return posts
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const post = await Post.create(data)
    return post
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const post = await Post.findOrFail(params.id)
      return post
    } catch (err) {
      return response.status(404).json({ error: { message: 'post not found' } })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    try {
      const post = await Post.findOrFail(params.id)
      post.merge(data)
      await post.save()
      return post
    } catch (err) {
      return response.status(400).json({ error: { message: 'post not found' } })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const post = await Post.findOrFail(params.id)
      await post.delete()
    } catch (error) {
      return response.status(400).json({ error: { message: 'post not found' } })
    }
  }
}
