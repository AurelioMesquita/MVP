import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticatorController } from 'src/gateways/http/controllers/domain/authentication/authentication.controller';
import { SessionService } from 'src/gateways/http/controllers/domain/authentication/session.service';
import { JwtStrategy } from './jwt.strategy';
import { ProfileController } from 'src/gateways/http/controllers/domain/profile/profile.controller';
import { RegisterController } from 'src/gateways/http/controllers/domain/register/register.controller';
import { RegisterService } from 'src/domains/domain/services/register/register.service';
import { AuthenticateService } from 'src/domains/domain/services/authentication/authenticate.service';
import { RegisterModule } from 'src/domains/domain/services/register/register.module';

@Module({
  imports: [
    RegisterModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev_secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthenticatorController, ProfileController, RegisterController],
  providers: [AuthenticateService, SessionService, JwtStrategy],
})
export class AuthModule {}
