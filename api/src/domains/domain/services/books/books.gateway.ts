import { DeepPartial } from 'typeorm';
import { Book } from '../../model-entities/books.entity';

export interface BooksGateway {
  createBook(book: DeepPartial<Book>): Promise<Book | null>;
  findByTitleAndUserId(title: string, userId: string): Promise<Book | null>;
  findById(id: string): Promise<Book | null>;
}
