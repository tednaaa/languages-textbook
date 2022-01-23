import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/entities/user.entity';

import { UsersModule } from './users/users.module';
import { LanguagesModule } from './languages/languages.module';
import { Language } from './languages/entities/language.entity';
import { TokenModule } from './tokens/token.module';
import { Token } from './tokens/entities/token.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
      cors: {
        credentials: true,
        origin: '*',
      },
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Language, Token],
      autoLoadModels: true,
    }),
    UsersModule,
    LanguagesModule,
    TokenModule,
  ],
})
export class AppModule {}
