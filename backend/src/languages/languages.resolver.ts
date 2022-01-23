import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LanguagesService } from './languages.service';
import { Language } from './entities/language.entity';
import { CreateLanguageInput } from './dto/create-language.input';
import { UpdateLanguageInput } from './dto/update-language.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/auth/auth.guard';

@Resolver(() => Language)
export class LanguagesResolver {
  @UseGuards(AuthGuard)
  @Mutation(() => Language)
  createLanguage(@Args('createLanguageInput') createLanguageInput: CreateLanguageInput) {
    return this.languagesService.create(createLanguageInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Language], { name: 'languages' })
  findAll(@Args('userId', { type: () => Int }) userId: number) {
    return this.languagesService.findAll(userId);
  }

  @UseGuards(AuthGuard)
  @Query(() => Language, { name: 'language' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.languagesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Language)
  updateLanguage(@Args('updateLanguageInput') updateLanguageInput: UpdateLanguageInput) {
    return this.languagesService.update(updateLanguageInput.id, updateLanguageInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Language)
  removeLanguage(@Args('id', { type: () => Int }) id: number) {
    return this.languagesService.remove(id);
  }

  constructor(private readonly languagesService: LanguagesService) {}
}
