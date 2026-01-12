import { MigrationInterface, QueryRunner } from 'typeorm';

export class Books1768067205745 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE book_status AS ENUM ('draft', 'writing', 'finished');
    `);

    await queryRunner.query(`
      CREATE TABLE if not exists books (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        status book_status NOT NULL DEFAULT 'draft',
        user_id UUID NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),

        CONSTRAINT fk_books_user
          FOREIGN KEY (user_id)
          REFERENCES users(id)
          ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE IF EXISTS books;
  `);

    await queryRunner.query(`
    DROP TYPE IF EXISTS book_status;
  `);
  }
}
