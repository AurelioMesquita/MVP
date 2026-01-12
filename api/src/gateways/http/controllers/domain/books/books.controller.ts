import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  AuthenticatorPresenter,
  AuthenticatorResponsePresenter,
} from 'src/gateways/http/presenters/authenticator/authenticator.presenter';
import { BooksDto } from 'src/gateways/http/dtos/books/book.dto';
import { BooksService } from 'src/domains/domain/services/books/books.service';
import { JwtAuthGuard } from 'src/framework/authentication/jwt-auth.guard';

@Controller('/books/create-book')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create book' })
  @ApiResponse({ status: 200, type: AuthenticatorResponsePresenter })
  async execute(@Body() body: BooksDto, @Req() req) {
    return this.booksService.createBook(body, req.user.userId);
  }
}
