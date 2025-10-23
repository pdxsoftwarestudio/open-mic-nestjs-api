import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlJwtAuthGuard } from 'src/auth/gql-jwt-auth.guard';
import { Event } from 'src/events/entities/event.entity';
import { CurrentUser } from './decorators/current-user.param-decorator';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { EventsService } from 'src/events/events.service';
import { UpdateEventInput } from 'src/events/dto/update-event.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly eventsService: EventsService,
  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  // @Query(() => [User], { name: 'users' })
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.findOne({ where: { id } });
  // }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @Query(() => User)
  @UseGuards(GqlJwtAuthGuard)
  async currentUser(@CurrentUser() user: User): Promise<User> {
    console.debug('hello', user);

    return user;
  }

  @ResolveField(() => String)
  @UseGuards(GqlJwtAuthGuard)
  async eventsCreated(@CurrentUser() user: User): Promise<Event[]> {
    const userWithEventsCreated = await this.usersService.findOne({
      where: { id: user.id },
      select: { id: true },
      relations: ['eventsCreated'],
    });

    console.debug('userWithEventsCreated: ', await userWithEventsCreated);

    return (await userWithEventsCreated).eventsCreated;
  }
}
