import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string({}, [rules.required()]),
    creatorId: schema.number([rules.exists({ column: 'id', table: 'users' })]),
    description: schema.string({}, [rules.required()]),
    date: schema.date({}, [rules.required()]),
  })
  public messages = {}
}
