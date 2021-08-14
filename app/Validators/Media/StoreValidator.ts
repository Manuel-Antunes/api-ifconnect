import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  public formats = ['png', 'jpg', 'jpeg', 'svg', 'mp4', 'wmv']
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    file: schema.file(
      {
        extnames: this.formats,
        size: '100mb',
      },
      [rules.required()]
    ),
  })
  public messages = {
    'file.extnames': `o arquivo não atende aos formatos (${this.formats.join(', ')})`,
    'file.size': 'o arquivo não pode passar do tamanho máximo de 100mb',
    'file.required': 'é necessário enviar um arquivo na rota de arquivos seu energumino',
  }
}
