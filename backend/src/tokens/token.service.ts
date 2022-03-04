import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';

import { UserDto } from '../users/dto/user.input';
import { LoginInput } from '../users/dto/login.input';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {
  async generateTokens(payload: UserDto) {
    const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '30m' });
    const refreshToken = this.jwtService.sign(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '30d' });
    return { accessToken, refreshToken };
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.tokenRepository.findOne({ where: { userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      tokenData.save();
    }

    const token = await this.tokenRepository.create({ userId, refreshToken });
    return token;
  }

  validateAccessToken(token: string) {
    const userData = this.jwtService.verify(token, { secret: process.env.JWT_ACCESS_SECRET });
    return userData;
  }

  validateRefreshToken(token: string) {
    const userData = this.jwtService.verify(token, { secret: process.env.JWT_REFRESH_SECRET });
    return userData;
  }

  async findToken(refreshToken: string) {
    const tokenData = await this.tokenRepository.findOne({ where: { refreshToken } });
    return tokenData;
  }

  async removeToken(refreshToken: string) {
    const token = await this.tokenRepository.findOne({ where: { refreshToken } });
    return token;
  }

  constructor(@InjectModel(Token) private tokenRepository: typeof Token, private jwtService: JwtService) {}
}
