import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Token } from '../../tokens/entities/token.entity';
import { Language } from '../../languages/entities/language.entity';

interface UserCreationAttributes {
  username: string;
  password: string;
}

@Table({ tableName: 'users' })
@ObjectType()
export class User extends Model<User, UserCreationAttributes> {
  @Field(() => Int)
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Field(() => String)
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;

  @Field(() => String)
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Field(() => [Language])
  @HasMany(() => Language)
  languages: Language[];

  @Field(() => [Token])
  @HasMany(() => Token)
  tokens: Token[];
}
