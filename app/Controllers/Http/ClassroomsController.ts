import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Classroom from 'App/Models/Classroom'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/Classroom/StoreValidator'
import UpdateValidator from 'App/Validators/Classroom/UpdateValidator'

export default class ClassroomsController {
  public async index({}: HttpContextContract) {
    const classrooms = await Classroom.query()
    return classrooms
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    try {
      const user = await User.findOrFail(data.userId)
      if (!user.isTeacher) {
        return response
          .status(400)
          .json({ error: { message: 'o usuário selecionado não é um professor' } })
      }
      const classroom = await Classroom.create(data)
      return classroom
    } catch (error) {
      return response.status(400).json({ error: { message: 'professor não encontrado' } })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const classroom = await Classroom.findOrFail(params.id)
      return classroom
    } catch (error) {
      return response.status(404).json({ error: { message: 'classrrom not found' } })
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    try {
      const classroom = await Classroom.findOrFail(params.id)
      classroom.merge(data)
      return classroom
    } catch (error) {
      return response.status(404).json({ error: { message: 'classroom not found' } })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const classroom = await Classroom.findOrFail(params.id)
      await classroom.delete()
    } catch (error) {
      return response.status(400).json({ error: { message: 'classroom not found' } })
    }
  }
}
