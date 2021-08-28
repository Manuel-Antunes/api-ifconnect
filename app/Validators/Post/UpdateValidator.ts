import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {
    return
  }

  public schema = schema.create({
    description: schema.string({}, []),
    userId: schema.number([rules.exists({ column: 'id', table: 'users' })]),
  })

  public messages = {
    'userId.exists': 'o id relacionado ao post deve ser relacionado a um usuário válido',
  }
}
