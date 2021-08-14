import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/User/StoreValidator'
import UpdateValidator from 'App/Validators/User/UpdateValidator'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.query()
    return users
  }
  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const user = await User.create(data)
    return user
  }
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
    } catch (error) {
      return response.status(400).json({ error: { message: 'user not found' } })
    }
  }
  public async show({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      return user
    } catch (error) {
      return response.status(404).json({ error: { message: 'user not found' } })
    }
  }
  public async update({ request, response, params }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    try {
      const user = await User.findOrFail(params.id)
      user.merge(data)
      await user.save()
      return user
    } catch (error) {
      return response.status(404).json({ error: { message: 'user not found' } })
    }
  }
}
