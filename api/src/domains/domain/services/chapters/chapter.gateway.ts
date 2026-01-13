import { ChapterDto } from 'src/gateways/http/dtos/chapter/chapter.dto';

export type CreateChapterInput = {
  title: string;
  content: string;
  position: number;
  bookId: string;
};
export interface ChapterGateway {
  findByBookAndPosition(
    bookId: string,
    position: number,
  ): Promise<ChapterDto | null>;
  createChapter(data: CreateChapterInput): Promise<ChapterDto>;
}
