import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BooksDto } from 'src/gateways/http/dtos/books/book.dto';
import type { BooksGateway } from './books.gateway';
@Injectable()
export class BooksService {
  constructor(
    @Inject('BooksGateway')
    private readonly booksRepository: BooksGateway,
  ) {}

  async createBook({ title, status }, userId: string): Promise<BooksDto> {
    const exists = await this.booksRepository.findByTitleAndUserId(
      title,
      userId,
    );
    if (exists) {
      throw new ConflictException('Nome do livro já existe.');
    }
    const newBook = await this.booksRepository.createBook({
      title,
      status,
      user: { id: userId },
    });
    if (!newBook) {
      throw new InternalServerErrorException('Erro ao criar o livro.');
    }

    return newBook;
  }

  async listByUser(userId: string): Promise<BooksDto[] | null> {
    return this.booksRepository.listByUser(userId);
  }

  async listByIdAndUser(
    id: string,
    userId: string,
    includeChapters = false,
  ): Promise<BooksDto | null> {
    const book = await this.booksRepository.findByIdAndUser(
      id,
      userId,
      includeChapters,
    );

    if (!book) {
      throw new NotFoundException('Livro não encontrado');
    }

    return book;
  }
}
