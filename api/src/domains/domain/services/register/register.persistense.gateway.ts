import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RegisterGateway } from './register.gateway';
import { User } from '../../model-entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RegisterPersistence implements RegisterGateway {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  createUser(data: Partial<User>): Promise<User> {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }
}
