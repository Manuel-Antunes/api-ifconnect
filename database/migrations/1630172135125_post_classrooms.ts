import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PostClassrooms extends BaseSchema {
  protected tableName = 'post_classrooms'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('post_id')
        .references('id')
        .inTable('posts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('classroom_id')
        .references('id')
        .inTable('classrooms')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.unique(['post_id'])
      table.unique(['post_id', 'classroom_id'])
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
