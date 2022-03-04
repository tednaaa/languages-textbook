import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { TokenService } from './token.service';
import { TokenResolver } from './token.resolver';
import { Token } from './entities/token.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [TokenResolver, TokenService],
  imports: [UsersModule, SequelizeModule.forFeature([Token, User]), JwtModule.register({})],
  exports: [TokenService],
})
export class TokenModule {}
