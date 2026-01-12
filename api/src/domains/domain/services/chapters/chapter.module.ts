import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../../model-entities/books.entity';
import { ChapterService } from './chapter.service';
import { ChapterPersistence } from './chapter.persistence';
import { Chapter } from '../../model-entities/chapter.entity';
import { BooksPersistence } from '../books/books.persistence';

@Module({
  imports: [TypeOrmModule.forFeature([Chapter, Book])],
  providers: [
    ChapterService,
    {
      provide: 'BooksGateway',
      useClass: BooksPersistence,
    },
    {
      provide: 'ChapterGateway',
      useClass: ChapterPersistence,
    },
  ],
  exports: [ChapterService, 'ChapterGateway'],
})
export class ChapterModule {}
