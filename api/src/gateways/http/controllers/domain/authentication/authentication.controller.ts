import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  AuthenticatorPresenter,
  AuthenticatorResponsePresenter,
} from 'src/gateways/http/presenters/authenticator/authenticator.presenter';
import { SessionService } from './session.service';
import { Public } from 'src/infrastructure/decorators/public.decorator';
import { LoginDto } from 'src/gateways/http/dtos/login/login.dto';
import { AuthenticateService } from 'src/domains/domain/services/authentication/authenticate.service';

@Controller('/auth')
export class AuthenticatorController {
  constructor(
    private readonly authenticateService: AuthenticateService,
    private readonly sessionService: SessionService,
  ) {}

  @Public()
  @Post('/login')
  @ApiOperation({ summary: 'Realiza login' })
  @ApiResponse({ status: 200, type: AuthenticatorResponsePresenter })
  async execute(@Body() body: LoginDto) {
    const accessToken = await this.authenticateService.execute(
      body.email,
      body.password,
    );
    const session = await this.sessionService.execute(accessToken);

    return {
      data: AuthenticatorPresenter.toSend(accessToken, session),
    };
  }
}
