import { User } from '../../model-entities/user.entity';

export interface RegisterGateway {
  findByEmail(email: string): Promise<User | null>;
  createUser(data: Partial<User>): Promise<User>;
}
