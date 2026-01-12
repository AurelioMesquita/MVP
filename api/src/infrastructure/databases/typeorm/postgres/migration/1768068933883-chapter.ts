import { MigrationInterface, QueryRunner } from 'typeorm';

export class Chapter1768068933883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE if not exists chapters (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        position INT NOT NULL,
        book_id UUID NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),

        CONSTRAINT fk_chapters_book
          FOREIGN KEY (book_id)
          REFERENCES books(id)
          ON DELETE CASCADE,

        CONSTRAINT unique_chapter_position
          UNIQUE (book_id, position)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE IF EXISTS chapters;
  `);
  }
}
