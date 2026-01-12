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

  findById(id: string): Promise<Book | null> {
    return this.repo.findOne({ where: { id }, relations: ['user'] });
  }

  createBook(data: Partial<Book>): Promise<Book> {
    const book = this.repo.create(data);
    return this.repo.save(book);
  }
}
