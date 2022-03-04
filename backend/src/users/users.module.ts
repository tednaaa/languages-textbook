import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

import { Language } from '../languages/entities/language.entity';
import { Token } from '../tokens/entities/token.entity';
import { TokenModule } from '../tokens/token.module';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [TokenModule, SequelizeModule.forFeature([User, Language, Token])],
})
export class UsersModule {}
