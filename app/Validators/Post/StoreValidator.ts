import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {
    return
  }
  public schema = schema.create({
    description: schema.string({}, [rules.required()]),
    userId: schema.number([rules.required(), rules.exists({ column: 'id', table: 'users' })]),
  })
  public messages = {
    'description.required': 'é necessário passar uma descrição para o post',
    'userId.required': 'é necessário que o post seja associado à um usuário',
    'userId.exists': 'o id relacionado ao post deve ser relacionado a um usuário válido',
  }
}
