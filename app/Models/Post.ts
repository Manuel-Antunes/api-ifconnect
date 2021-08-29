import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeFetch,
  beforeFind,
  belongsTo,
  BelongsTo,
  column,
  computed,
  ManyToMany,
  manyToMany,
  ModelQueryBuilderContract,
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

  @manyToMany(() => Media, { pivotTable: 'post_media' })
  public media: ManyToMany<typeof Media>

  @manyToMany(() => Classroom, { pivotTable: 'post_classrooms' })
  public classroom: ManyToMany<typeof Classroom>

  @manyToMany(() => User, { serializeAs: null })
  public usersWhoLike: ManyToMany<typeof User>

  @beforeFetch()
  @beforeFind()
  public static ignoreDeleted(query: ModelQueryBuilderContract<typeof Post>) {
    query.preload('usersWhoLike')
  }

  @computed()
  public get likes() {
    return this.usersWhoLike ? this.usersWhoLike.length : 0
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
