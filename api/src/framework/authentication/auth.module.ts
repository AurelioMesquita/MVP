import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticateService } from 'src/domain/services/authentication/authenticate.service';
import { AuthenticatorController } from 'src/gateways/http/controllers/domain/authentication/authentication.controller';
import { SessionService } from 'src/gateways/http/controllers/domain/authentication/session.service';
import { JwtStrategy } from './jwt.strategy';
import { ProfileController } from 'src/gateways/http/controllers/domain/profile/profile.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev_secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthenticatorController, ProfileController],
  providers: [AuthenticateService, SessionService, JwtStrategy],
})
export class AuthModule {}
