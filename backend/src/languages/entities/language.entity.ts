import { ObjectType, Field } from '@nestjs/graphql';
import { Column, DataType, Table } from 'sequelize-typescript';

@Table({ tableName: 'languages' })
@ObjectType()
export class Language {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @Field()
  id: number;

  @Column({ type: DataType.STRING })
  @Field()
  language: string;
}
