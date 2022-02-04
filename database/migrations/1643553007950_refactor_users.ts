import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RefactorUsers extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('is_teacher')
      table.string('gender', 50).notNullable()
      table
        .enum('position', ['teacher', 'student', 'visitant'], {
          useNative: true,
          enumName: 'positions_values',
          existingType: false,
        })
        .nullable()
      table.string('username').notNullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('is_teacher').notNullable().defaultTo(false)
      table.dropColumn('gender')
      table.dropColumn('position')
      table.dropColumn('username')
    })
  }
}
