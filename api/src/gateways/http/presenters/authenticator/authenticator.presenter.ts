import { ApiProperty } from '@nestjs/swagger';

class SessionPresenter {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  expiresAt: Date;
}

export class AuthenticatorPresenter {
  @ApiProperty()
  accessToken: string;

  @ApiProperty({ type: SessionPresenter })
  session: SessionPresenter;

  static toSend(accessToken: string, session: SessionPresenter) {
    return {
      accessToken,
      session,
    };
  }
}

export class AuthenticatorResponsePresenter {
  @ApiProperty({ type: AuthenticatorPresenter })
  data: AuthenticatorPresenter;
}
