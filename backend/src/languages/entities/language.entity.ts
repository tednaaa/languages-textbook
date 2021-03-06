import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { User } from '../../users/entities/user.entity';

interface LanguageCreationAttributes {
  userId: number;
  language: string;
}

@Table({ tableName: 'languages' })
@ObjectType()
export class Language extends Model<Language, LanguageCreationAttributes> {
  @Field(() => Int)
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Field(() => Int)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  @Field(() => User)
  user: User;

  @Field(() => String)
  @Column({ type: DataType.STRING, unique: true })
  language: string;
}
