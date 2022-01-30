import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string({}, [rules.required()]),
    username: schema.string({}, [rules.required()]),
    email: schema.string({}, [
      rules.email(),
      rules.required(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    profileId: schema.number.optional([rules.exists({ column: 'id', table: 'media' })]),
    password: schema.string({}, [rules.required(), rules.minLength(8)]),
    position: schema.string({}, [rules.required()]),
    gender: schema.string({}, [rules.required()]),
  })
  public messages = {
    'name.required': 'o nome é obrigatório',
    'username.required': 'o username é obrigatório',
    'profileId.exists': 'a foto de perfil não foi enviada corretamente',
    'email.required': 'o email é obrigatório',
    'email.email': 'o campo precisa ser formatado como um email',
    'email.unique': 'este endereço de email já existe',
    'password.required': 'a senha é obrigatória',
    'password.minLength': 'a senha precisa ter no mínimo 8 caracteres',
    'position.required': 'o campo position é obrigratório',
    'gender.required': 'o campo gender é obrigatório',
  }
}
