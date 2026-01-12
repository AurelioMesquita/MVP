import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/domains/domain/model-entities/user.entity';

export enum BookStatus {
  DRAFT = 'draft',
  WRITING = 'writing',
  FINISHED = 'finished',
}

export class BooksDto {
  @ApiProperty({ example: 'Meu primeiro livro' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ enum: BookStatus, example: BookStatus.DRAFT })
  @IsEnum(BookStatus)
  status: BookStatus;
}
