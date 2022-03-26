import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('input') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  // @Query(() => [User], { name: 'user' })
  // findAll() {
  //   return this.userService.findAll();
  // }
  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne({id});
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  updateUser(@Args('input') updateUserInput: UpdateUserInput) {
    return this.userService.update({id: updateUserInput.id}, updateUserInput);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.remove(id);
  }
}
