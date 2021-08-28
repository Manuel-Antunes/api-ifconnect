import { DateTime } from 'luxon'
import {
  BaseModel,
  belongsTo,
  BelongsTo,
  column,
  computed,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Media from './Media'
import Classroom from './Classroom'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @manyToMany(() => Media)
  public media: ManyToMany<typeof Media>

  @manyToMany(() => Classroom)
  public classroom: ManyToMany<typeof Classroom>

  @hasMany(() => User, { serializeAs: null })
  public usersWhoLike: HasMany<typeof User>

  @computed()
  public get likes() {
    return this.usersWhoLike.length
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
