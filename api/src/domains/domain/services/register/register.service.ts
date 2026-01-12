import { Injectable, ConflictException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { RegisterGateway } from './register.gateway';

@Injectable()
export class RegisterService {
  constructor(
    @Inject('RegisterGateway')
    private readonly usersRepository: RegisterGateway,
  ) {}
  async execute(data: { name: string; email: string; password: string }) {
    const exists = await this.usersRepository.findByEmail(data.email);

    if (exists) {
      throw new ConflictException('E-mail já cadastrado');
    }
    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await this.usersRepository.createUser({
      name: data.name,
      email: data.email,
      passwordHash,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
