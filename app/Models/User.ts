import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  belongsTo,
  BelongsTo,
  beforeFind,
  ModelQueryBuilderContract,
  beforeFetch,
} from '@ioc:Adonis/Lucid/Orm'
import Media from './Media'

export enum Position {
  TEACHER = 'teacher',
  STUDENT = 'student',
  VISITANT = 'visitant',
}

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public username: string

  @column()
  public gender: string

  @column()
  public position?: Position

  @column()
  public isTeacher: boolean

  @column()
  public profileId: number

  @belongsTo(() => Media, { foreignKey: 'profileId' })
  public profilePhoto: BelongsTo<typeof Media>

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeFetch()
  @beforeFind()
  public static async preloadData(query: ModelQueryBuilderContract<typeof User>) {
    query.preload('profilePhoto')
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
