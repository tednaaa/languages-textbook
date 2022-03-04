import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLanguageInput } from './dto/create-language.input';
import { UpdateLanguageInput } from './dto/update-language.input';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguagesService {
  async create(createLanguageInput: CreateLanguageInput) {
    const language = await this.languageRepository.create(createLanguageInput);
    return language;
  }

  async findAll(userId: number) {
    const languages = await this.languageRepository.findAll({ where: { userId } });
    return languages;
  }

  async findOne(id: number) {
    const language = await this.languageRepository.findOne({ where: { id } });
    return language;
  }

  async update(id: number, updateLanguageInput: UpdateLanguageInput) {
    const language = await this.languageRepository.update(updateLanguageInput, { where: { id } });
    return language;
  }

  async remove(id: number) {
    const removedLanguageId = await this.languageRepository.destroy({ where: { id } });
    return removedLanguageId;
  }

  constructor(@InjectModel(Language) private languageRepository: typeof Language) {}
}
