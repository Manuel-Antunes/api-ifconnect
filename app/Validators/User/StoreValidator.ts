import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.required()]),
    password: schema.string({}, [rules.required(), rules.minLength(8)]),
  })
  public messages = {
    'email.required': 'o email é obrigatorio',
    'email.email': 'o campo precisa ser formatado como um email',
    'password.required': 'a senha é obrigatoria',
    'password.minLength': 'a senha precisa ter no minimo 8 caracteres',
  }
}
