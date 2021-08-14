import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string({}, []),
    creatorId: schema.number([rules.exists({ column: 'id', table: 'users' })]),
    description: schema.string({}, []),
    date: schema.date({}, []),
  })

  public messages = {}
}
