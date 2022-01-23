import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { TokenService } from '../tokens/token.service';
import { UserDto } from './dto/user.input';
import { LoginInput } from './dto/login.input';
import { NotFoundError } from 'rxjs';
import { Token } from '../tokens/entities/token.entity';

@Injectable()
export class UsersService {
  async create(createUserInput: CreateUserInput) {
    const salt = 3;
    const hashedPassword = await bcrypt.hash(createUserInput.password, salt);
    const user = await this.userRepository.create({ ...createUserInput, password: hashedPassword });
    const userDto = { ...new UserDto(user) };

    const tokens = await this.tokenService.generateTokens(userDto);
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async remove(id: number) {
    const user = await this.userRepository.destroy({ where: { id } });
    return user;
  }

  async login(loginInput: LoginInput) {
    const user = await this.userRepository.findOne({ where: { username: loginInput.username } });
    if (!user) throw new Error('User not found');

    const isPasswordsEqual = bcrypt.compare(user.password, loginInput.password);
    if (!isPasswordsEqual) throw new Error('Wrong password');

    const userDto = { ...new UserDto(user) };

    const tokens = await this.tokenService.generateTokens(userDto);
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string) {
    const token = await this.tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException();

    const userData = this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) throw new UnauthorizedException();

    const user = await this.userRepository.findOne({ where: { id: userData.id } });
    const userDto = { ...new UserDto(user) };

    const tokens = await this.tokenService.generateTokens(userDto);
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  constructor(@InjectModel(User) private userRepository: typeof User, private tokenService: TokenService) {}
}
