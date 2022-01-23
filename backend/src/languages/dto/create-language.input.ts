import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateLanguageInput {
  @Field(() => Int)
  readonly userId: number;

  @Field(() => String)
  readonly language: string;
}
