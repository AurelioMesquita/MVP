import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksGateway } from './books.gateway';
import { Book } from '../../model-entities/books.entity';

@Injectable()
export class BooksPersistence implements BooksGateway {
  constructor(
    @InjectRepository(Book)
    private readonly repo: Repository<Book>,
  ) {}

  findByTitleAndUserId(title: string, userId: string): Promise<Book | null> {
    return this.repo.findOne({ where: { title, user: { id: userId } } });
  }

  findByIdAndUser(
    id: string,
    userId: string,
    includeChapters = false,
  ): Promise<Book | null> {
    return this.repo.findOne({
      where: { id, user: { id: userId } },
      relations: includeChapters ? ['chapters', 'user'] : ['user'],
    });
  }

  listByUser(userId: string): Promise<Book[] | null> {
    return this.repo.find({
      where: { user: { id: userId } },
      order: {
        created_at: 'DESC',
      },
    });
  }

  createBook(data: Partial<Book>): Promise<Book> {
    const book = this.repo.create(data);
    return this.repo.save(book);
  }
}
