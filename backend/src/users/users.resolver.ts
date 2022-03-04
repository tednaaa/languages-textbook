import { Resolver, Query, Mutation, Args, Int, Context, GraphQLExecutionContext } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/auth/auth.guard';

@Resolver(() => User)
export class UsersResolver {
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @Context() context: GraphQLExecutionContext,
  ) {
    const response = context.switchToHttp().getResponse();

    const userData = await this.usersService.create(createUserInput);
    const cookieMaxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

    response.cookie('refreshToken', userData.refreshToken, { maxAge: cookieMaxAge, httpOnly: true });

    return userData;
  }

  @UseGuards(AuthGuard)
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @Mutation(() => User)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.usersService.login(loginInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  async logout(@Context() context: GraphQLExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { refreshToken } = request.cookies;
    const token = await this.usersService.logout(refreshToken);

    response.clearCookie('refreshToken');

    return token;
  }

  constructor(private readonly usersService: UsersService) {}
}
