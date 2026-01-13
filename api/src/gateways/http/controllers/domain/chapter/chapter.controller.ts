import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticatorResponsePresenter } from 'src/gateways/http/presenters/authenticator/authenticator.presenter';
import { JwtAuthGuard } from 'src/framework/authentication/jwt-auth.guard';
import { ChapterDto } from 'src/gateways/http/dtos/chapter/chapter.dto';
import { ChapterService } from 'src/domains/domain/services/chapters/chapter.service';

@Controller('/books/:bookId/chapters')
@UseGuards(JwtAuthGuard)
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Post()
  @ApiOperation({ summary: 'Create chapter' })
  @ApiResponse({ status: 200, type: AuthenticatorResponsePresenter })
  async execute(
    @Param('bookId') bookId: string,
    @Body() dto: ChapterDto,
    @Req() req,
  ) {
    console.log(req.user);
    return this.chapterService.create(dto, bookId, req.user.userId);
  }
}
