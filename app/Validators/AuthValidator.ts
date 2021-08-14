import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    email: schema.string({}, [
      rules.email(),
      rules.required(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({}, [rules.required(), rules.minLength(8)]),
  })
  public messages = {
    'email.required': 'o email é obrigatório',
    'email.email': 'o campo precisa ser formatado como um email',
    'password.required': 'a senha é obrigatória',
    'password.minLength': 'a senha precisa ter no mínimo 8 caracteres',
  }
}
