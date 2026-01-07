import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticateService {
  constructor(private readonly jwtService: JwtService) {}

  async execute(code: string) {
    if (code !== '123456') {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const payload = {
      sub: 'user-id-1',
      email: 'teste@email.com',
    };

    return this.jwtService.sign(payload);
  }
}
