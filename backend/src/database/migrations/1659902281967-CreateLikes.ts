import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class CreateLikes1659902281967 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'likes',
      columns: [
        {
          name: 'id',
          type: 'char(36)',
          isPrimary: true,
        },
        {
          name: 'user_id',
          type: 'char(36)',
        },
        {
          name: 'post_id',
          type: 'char(36)',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    }));

    await queryRunner.createForeignKey(
      'likes',
      new TableForeignKey({
        name: 'FKUserIdLikesTable',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'likes',
      new TableForeignKey({
        name: 'FKPostId',
        referencedTableName: 'posts',
        referencedColumnNames: ['id'],
        columnNames: ['post_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'likes',
      'FKUserIdLikesTable',
    );

    await queryRunner.dropForeignKey(
      'likes',
      'FKPostId',
    );

    await queryRunner.dropTable('likes');
  }
}
