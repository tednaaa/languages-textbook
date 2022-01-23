import { Resolver, Mutation, Context, GraphQLExecutionContext } from '@nestjs/graphql';

import { Token } from './entities/token.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/auth/auth.guard';
import { UsersService } from '../users/users.service';

@Resolver(() => Token)
export class TokenResolver {
  @UseGuards(AuthGuard)
  @Mutation(() => Token)
  async refresh(@Context() context: GraphQLExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { refreshToken } = request.cookies;
    const userData = await this.usersService.refresh(refreshToken);
    const cookieMaxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

    response.cookie('refreshToken', userData.refreshToken, { maxAge: cookieMaxAge, httpOnly: true });

    return userData;
  }

  constructor(private readonly usersService: UsersService) {}
}
