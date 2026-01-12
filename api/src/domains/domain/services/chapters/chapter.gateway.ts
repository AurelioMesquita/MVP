import { ChapterDto } from 'src/gateways/http/dtos/chapter/chapter.dto';

export interface ChapterGateway {
  findByBookAndPosition(
    bookId: string,
    position: number,
  ): Promise<ChapterDto | null>;
  createChapter(data: {
    title: string;
    content: string;
    position: number;
    bookId: string;
  }): Promise<ChapterDto>;
}
