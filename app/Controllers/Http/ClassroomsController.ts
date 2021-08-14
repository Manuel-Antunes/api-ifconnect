import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Classroom from 'App/Models/Classroom'
import StoreValidator from 'App/Validators/Classroom/StoreValidator'
import UpdateValidator from 'App/Validators/Classroom/UpdateValidator'

export default class ClassroomsController {
  public async index({}: HttpContextContract) {
    const classrooms = await Classroom.query()
    return classrooms
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const classroom = await Classroom.create(data)
    return classroom
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
