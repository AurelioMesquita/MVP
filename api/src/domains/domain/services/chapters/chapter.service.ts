import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { ChapterGateway } from './chapter.gateway';
import type { ChapterDto } from 'src/gateways/http/dtos/chapter/chapter.dto';
import type { BooksGateway } from '../books/books.gateway';
@Injectable()
export class ChapterService {
  constructor(
    @Inject('BooksGateway')
    private readonly booksRepository: BooksGateway,

    @Inject('ChapterGateway')
    private readonly chaptersRepository: ChapterGateway,
  ) {}

  async create(
    dto: ChapterDto,
    bookId: string,
    userId: string,
  ): Promise<ChapterDto> {
    const book = await this.booksRepository.findByIdAndUser(bookId, userId);
    if (!book || book.user.id !== userId) {
      throw new UnauthorizedException('Livro não encontrado');
    }
    console.log('bookId', bookId);
    const existsPosition = await this.chaptersRepository.findByBookAndPosition(
      bookId,
      dto.position,
    );

    if (existsPosition) {
      throw new ConflictException('Já existe um capítulo nessa posição');
    }

    return this.chaptersRepository.createChapter({
      ...dto,
      bookId,
    });
  }
}
