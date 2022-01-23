import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesResolver } from './languages.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Language } from './entities/language.entity';
import { User } from '../users/entities/user.entity';

@Module({
  providers: [LanguagesResolver, LanguagesService],
  imports: [SequelizeModule.forFeature([Language, User])],
})
export class LanguagesModule {}
