import { CreateLanguageInput } from './create-language.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLanguageInput extends PartialType(CreateLanguageInput) {
  @Field()
  readonly id: number;
}
