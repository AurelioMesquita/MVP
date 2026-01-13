import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  AuthenticatorPresenter,
  AuthenticatorResponsePresenter,
} from 'src/gateways/http/presenters/authenticator/authenticator.presenter';
import { BooksDto } from 'src/gateways/http/dtos/books/book.dto';
import { BooksService } from 'src/domains/domain/services/books/books.service';
import { JwtAuthGuard } from 'src/framework/authentication/jwt-auth.guard';

@Controller('/books')
@UseGuards(JwtAuthGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a book' })
  @ApiResponse({ status: 200, type: AuthenticatorResponsePresenter })
  async execute(@Body() body: BooksDto, @Req() req) {
    return this.booksService.createBook(body, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'List my books' })
  async list(@Req() req) {
    return this.booksService.listByUser(req.user.userId);
  }
  @Get('/:id')
  @ApiOperation({ summary: 'Get my book by id' })
  async listOne(
    @Param('id') id: string,
    @Req() req,
    @Query('includeChapters') includeChapters: string,
  ) {
    return this.booksService.listByIdAndUser(
      id,
      req.user.userId,
      includeChapters === 'true',
    );
  }
}
