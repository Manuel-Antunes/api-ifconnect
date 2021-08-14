import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Media from 'App/Models/Media'
import StoreValidator from 'App/Validators/Media/StoreValidator'
import Application from '@ioc:Adonis/Core/Application'

export default class MediaController {
  public async index({}: HttpContextContract) {
    const media = await Media.query()
    return media
  }

  public async store({ request, response }: HttpContextContract) {
    const upload = await request.validate(StoreValidator)
    try {
      const filename = `${Date.now()}.${upload.file.subtype}`
      await upload.file.move(Application.tmpPath('uploads'), { name: filename })
      const media = await Media.create({
        file: filename,
        name: upload.file.clientName,
        type: upload.file.type,
        subtype: upload.file.subtype,
      })
      return media
    } catch (err) {
      return response
        .status(501)
        .json({ error: { message: 'ocorreu um erro ao salvar o arquivo, favor tente novamente' } })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const media = await Media.findOrFail(params.id)
      response.download(Application.tmpPath('uploads/' + media.file))
    } catch (error) {
      return response.status(404).json({ error: { message: 'midia não encontrada' } })
    }
  }
}
