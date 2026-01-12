import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { RegisterGateway } from '../register/register.gateway';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthenticateService {
  constructor(
    @Inject('RegisterGateway')
    private readonly usersRepository: RegisterGateway,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const payload = {
      userId: user.id,
      email: email,
    };

    return this.jwtService.sign(payload);
  }
}
