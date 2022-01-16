import { CreateLanguageInput } from './create-language.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLanguageInput extends PartialType(CreateLanguageInput) {
  @Field()
  id: number;
}
