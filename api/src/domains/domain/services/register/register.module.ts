import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../model-entities/user.entity';
import { RegisterService } from './register.service';
import { RegisterPersistence } from './register.persistense.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    RegisterService,
    {
      provide: 'RegisterGateway',
      useClass: RegisterPersistence,
    },
  ],
  exports: [RegisterService, 'RegisterGateway'],
})
export class RegisterModule {}
