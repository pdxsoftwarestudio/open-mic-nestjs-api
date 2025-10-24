import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { GqlJwtAuthGuard } from 'src/auth/gql-jwt-auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.param-decorator';
import { User } from 'src/users/entities/user.entity';
import { Event } from './entities/event.entity';
import { EventsService } from './events.service';
import { Participant } from 'src/participants/entities/participant.entity';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Query(() => [Event], { name: 'events' })
  events() {
    return this.eventsService.findAll();
  }

  @Query(() => Event, { name: 'event' })
  async event(
    @Args('eventId', { type: () => Int }) eventId: number,
  ): Promise<Event> {
    console.debug('eventId', eventId);

    return this.eventsService.findOne({
      where: { id: eventId },
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        location: true,
      },
    });
  }

  @Mutation(() => Event)
  @UseGuards(GqlJwtAuthGuard)
  async createEvent(
    @Args('title') title: string,
    @Args('description') description: string,
    @CurrentUser() user: User,
  ): Promise<Event> {
    const newEvent = new Event();
    newEvent.title = title;
    newEvent.description = description;

    this.eventsService.create({
      title,
      description,
      location: 'TBD',
      date: new Date().toISOString(),
      creatorId: user.id,
    });

    return newEvent;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlJwtAuthGuard)
  async deleteEvent(
    @Args('eventId', { type: () => Int }) eventId: number,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    const event = await this.eventsService.findOne({
      where: { id: eventId },
      select: { id: true },
      relations: { creator: true },
    });

    if (event.creator.id !== user.id) {
      throw new Error('You are not authorized to delete this event.');
    }

    return this.eventsService.remove(eventId);
  }

  @Mutation(() => Event)
  @UseGuards(GqlJwtAuthGuard)
  async updateEvent(
    @Args('id', { type: () => Int }) id: number,
    @Args('location') location: string,
    @Args('date') date: string,
    @Args('title') title: string,
    @Args('description') description: string,
    @CurrentUser() user: User,
  ): Promise<Event> {
    const event = await this.eventsService.findOne({
      where: { id },
      select: { creator: { id: true } },
    });

    if (event.creator.id !== user.id) {
      throw new Error('You are not authorized to update this event.');
    }

    event.title = title;
    event.description = description;
    event.location = location;
    event.date = date;

    return this.eventsService.update(id, event);
  }

  @ResolveField(() => String)
  @UseGuards(GqlJwtAuthGuard)
  async participants(@Root() event: Event): Promise<Participant[]> {
    const eventWithParticipants = await this.eventsService.findOne({
      where: { id: event.id },
      select: { id: true },
      relations: ['participants'],
    });

    console.debug('eventWithParticipants: ', await eventWithParticipants);

    return (await eventWithParticipants).participants;
  }
}
