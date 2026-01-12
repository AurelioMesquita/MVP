import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { BooksDto } from 'src/gateways/http/dtos/books/book.dto';
import type { BooksGateway } from './books.gateway';
@Injectable()
export class BooksService {
  constructor(
    @Inject('BooksGateway')
    private readonly booksRepository: BooksGateway,
  ) {}

  async createBook({ title, status }, userId: string): Promise<BooksDto> {
    const book = await this.booksRepository.findByTitleAndUserId(title, userId);
    if (book) {
      throw new UnauthorizedException('Nome do livro já existe.');
    }
    const newBook = await this.booksRepository.createBook({
      title,
      status,
      user: { id: userId },
    });
    if (!newBook) {
      throw new UnauthorizedException('Erro ao criar o livro.');
    }

    return newBook;
  }
}
