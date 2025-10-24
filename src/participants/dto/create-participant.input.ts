import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateParticipantInput {
  @Field(() => ID, { description: 'ID of the user creating the participant.' })
  eventId: number | string;

  @Field(() => String, { description: 'Name of the participant.' })
  name: string;
}
