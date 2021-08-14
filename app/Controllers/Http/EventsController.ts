import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'
import UpdateValidator from 'App/Validators/Classroom/UpdateValidator'
import StoreValidator from 'App/Validators/Event/StoreValidator'

export default class EventsController {
  public async index({}: HttpContextContract) {
    const events = await Event.query()
    return events
  }
  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const event = await Event.create(data)
    return event
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const event = await Event.findOrFail(params.id)
      return event
    } catch (error) {
      return response.status(404).json({ error: { message: 'event not found' } })
    }
  }

  public async update({ params, response, request }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    try {
      const event = await Event.findOrFail(params.id)
      event.merge(data)
      await event.save()
      return event
    } catch (error) {
      return response.status(404).json({ error: { message: 'event not found' } })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const event = await Event.findOrFail(params.id)
      await event.delete()
    } catch (error) {
      return response.status(404).json({ error: { message: 'event not found' } })
    }
  }
}
