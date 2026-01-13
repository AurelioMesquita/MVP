import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChapterGateway, CreateChapterInput } from './chapter.gateway';
import { Chapter } from '../../model-entities/chapter.entity';

@Injectable()
export class ChapterPersistence implements ChapterGateway {
  constructor(
    @InjectRepository(Chapter)
    private readonly repo: Repository<Chapter>,
  ) {}

  findByBookAndPosition(
    bookId: string,
    position: number,
  ): Promise<Chapter | null> {
    return this.repo.findOne({ where: { book: { id: bookId }, position } });
  }

  createChapter(data: CreateChapterInput): Promise<Chapter> {
    console.log('data', data);
    const chapter = this.repo.create({
      title: data.title,
      content: data.content,
      position: data.position,
      book: { id: data.bookId },
    });
    return this.repo.save(chapter);
  }
}
