import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../../model-entities/books.entity';
import { BooksService } from './books.service';
import { BooksPersistence } from './books.persistence';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [
    BooksService,
    {
      provide: 'BooksGateway',
      useClass: BooksPersistence,
    },
  ],
  exports: [BooksService, 'BooksGateway'],
})
export class BooksModule {}
