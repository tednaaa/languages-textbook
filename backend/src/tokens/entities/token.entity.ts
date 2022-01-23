import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { User } from '../../users/entities/user.entity';

interface TokenCreationAttributes {
  userId: number;
  refreshToken: string;
}

@Table({ tableName: 'tokens' })
@ObjectType()
export class Token extends Model<Token, TokenCreationAttributes> {
  @Field(() => Int)
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Field(() => Int)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @Field(() => String)
  @Column({ type: DataType.STRING, unique: true })
  refreshToken: string;
}
