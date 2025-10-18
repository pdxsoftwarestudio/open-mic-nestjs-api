import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Event } from './entities/event.entity';
import { EventsService } from './events.service';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Query(() => [Event], { name: 'events' })
  findAll() {
    return this.eventsService.findAll();
  }

  @Query(() => Event, { name: 'event', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.eventsService.findOne(id);
  }

  @Mutation(() => Event)
  createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventsService.create(createEventInput);
  }

  @Mutation(() => Event, { nullable: true })
  updateEvent(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
  ) {
    return this.eventsService.update(id, updateEventInput);
  }

  @Mutation(() => Boolean)
  removeEvent(@Args('id', { type: () => Int }) id: number) {
    return this.eventsService.remove(id);
  }
}
