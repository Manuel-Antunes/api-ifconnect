import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    email: schema.string.optional({}, [rules.email()]),
    password: schema.string.optional({}, [rules.minLength(8)]),
  })
  public messages = {
    'email.email': 'o campo precisa ser formatado como um email',
    'password.minLength': 'a senha precisa ter no minimo 8 caracteres',
  }
}
