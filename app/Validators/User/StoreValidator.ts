import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string({}, [rules.required()]),
    email: schema.string({}, [
      rules.email(),
      rules.required(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({}, [rules.required(), rules.minLength(8)]),
    isTeacher: schema.boolean.optional([]),
  })
  public messages = {
    'name.required': 'o nome é obrigatório',
    'email.required': 'o email é obrigatório',
    'email.email': 'o campo precisa ser formatado como um email',
    'email.unique': 'este endereço de email já existe',
    'password.required': 'a senha é obrigatória',
    'password.minLength': 'a senha precisa ter no mínimo 8 caracteres',
  }
}
