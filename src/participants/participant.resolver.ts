import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlJwtAuthGuard } from 'src/auth/gql-jwt-auth.guard';
import { EventsService } from 'src/events/events.service';
import { CurrentUser } from 'src/users/decorators/current-user.param-decorator';
import { User } from 'src/users/entities/user.entity';
import { Participant } from './entities/participant.entity';
import { ParticipantsService } from './participant.service';

@Resolver(() => Participant)
export class ParticipantsResolver {
  constructor(
    private readonly participantsService: ParticipantsService,
    private readonly eventsService: EventsService,
  ) {}

  @Query(() => [Participant], { name: 'participants' })
  participants() {
    return this.participantsService.findAll();
  }

  @Mutation(() => Participant)
  @UseGuards(GqlJwtAuthGuard)
  async createParticipant(
    @Args('eventId', { type: () => Int }) eventId: number,
    @Args('name') name: string,
    @CurrentUser() user: User,
  ): Promise<Participant> {
    console.debug('createParticipant', eventId, name, user);

    const event = await this.eventsService.findOne({
      where: { id: eventId },
      select: { id: true },
      relations: { creator: true },
    });

    console.debug('event', event);
    console.debug('user', user);

    if (event.creator.id !== user.id) {
      throw new Error('You are not authorized to modify this event.');
    }
    console.debug('createParticipant', eventId, name, user);

    const newParticipant = new Participant();
    newParticipant.name = name;

    const createdParticipant = await this.participantsService.create({
      name,
      eventId: event.id,
    });

    return createdParticipant;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlJwtAuthGuard)
  async deleteParticipant(
    // NOTE: eventId could be derived, but this is a bit clearer and more convenient.
    @Args('eventId', { type: () => Int }) eventId: number,
    @Args('participantId', { type: () => Int }) participantId: number,
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

    const participant = await this.participantsService.findOne({
      where: { id: participantId },
      select: { id: true },
    });

    return this.participantsService.remove(participant.id);
  }

  @Mutation(() => Participant)
  @UseGuards(GqlJwtAuthGuard)
  async updateParticipant(
    // NOTE: eventId could be derived, but this is a bit clearer and more convenient.
    @Args('eventId', { type: () => Int }) eventId: number,
    @Args('participantId', { type: () => Int }) participantId: number,
    @Args('name') name: string,
    @CurrentUser() user: User,
  ): Promise<Participant> {
    const event = await this.eventsService.findOne({
      where: { id: eventId },
      select: { id: true },
      relations: { creator: true },
    });

    if (event.creator.id !== user.id) {
      throw new Error('You are not authorized to delete this event.');
    }

    const participant = await this.participantsService.findOne({
      where: { id: participantId },
    });

    participant.name = name;

    return this.participantsService.update(participantId, participant);
  }
}
