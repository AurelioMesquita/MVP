import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChapterDto {
  @ApiProperty({ example: 'Capítulo 1 – O começo' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Conteúdo do capítulo...' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: 1,
    description: 'Posição do capítulo dentro do livro',
  })
  @IsInt()
  @Min(1)
  position: number;
}
