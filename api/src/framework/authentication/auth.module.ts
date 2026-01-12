import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticatorController } from 'src/gateways/http/controllers/domain/authentication/authentication.controller';
import { SessionService } from 'src/gateways/http/controllers/domain/authentication/session.service';
import { JwtStrategy } from './jwt.strategy';
import { ProfileController } from 'src/gateways/http/controllers/domain/profile/profile.controller';
import { RegisterController } from 'src/gateways/http/controllers/domain/register/register.controller';
import { AuthenticateService } from 'src/domains/domain/services/authentication/authenticate.service';
import { RegisterModule } from 'src/domains/domain/services/register/register.module';
import { BooksModule } from 'src/domains/domain/services/books/book.module';
import { BooksController } from 'src/gateways/http/controllers/domain/books/books.controller';
import { BooksService } from 'src/domains/domain/services/books/books.service';
import { ChapterModule } from 'src/domains/domain/services/chapters/chapter.module';
import { ChapterController } from 'src/gateways/http/controllers/domain/chapter/chapter.controller';
import { ChapterService } from 'src/domains/domain/services/chapters/chapter.service';

@Module({
  imports: [
    RegisterModule,
    BooksModule,
    ChapterModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev_secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    AuthenticatorController,
    ProfileController,
    RegisterController,
    BooksController,
    ChapterController,
  ],
  providers: [
    AuthenticateService,
    SessionService,
    JwtStrategy,
    BooksService,
    ChapterService,
  ],
})
export class AuthModule {}
