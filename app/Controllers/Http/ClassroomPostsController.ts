import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Classroom from 'App/Models/Classroom'
import StoreValidator from 'App/Validators/Post/StoreValidator'

export default class ClassroomPostsController {
  public async index({ params, request, response }: HttpContextContract) {
    try {
      const { limit, offset = 1 } = request.qs()
      const classroom = await Classroom.findOrFail(params.classroom_id)
      const posts = limit
        ? await classroom.related('posts').query().paginate(offset, limit)
        : await classroom.related('posts').query()
      return posts
    } catch (err) {
      console.log(err)

      return response.status(400).send({ error: { message: 'class not found' } })
    }
  }

  public async store({ request, response, params }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    try {
      const classroom = await Classroom.findOrFail(params.classroom_id)
      const post = await classroom.related('posts').create(data)
      return post
    } catch (error) {
      return response.status(400).send({ error: { message: 'class not found' } })
    }
  }
}
