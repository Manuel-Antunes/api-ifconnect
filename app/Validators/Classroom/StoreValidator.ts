import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string({}, [rules.required()]),
    subject: schema.string({}, [rules.required()]),
    userId: schema.number([rules.required()]),
  })
  public messages = {
    'name.required': 'o nome é obrigatorio',
    'subject.required': 'o subject é obrigatório',
    'userId.required': 'o userId é obrigatoria',
    'userId.exists': 'esse usuário não existe',
  }
}
