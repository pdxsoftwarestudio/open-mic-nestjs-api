import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
  @Field(() => ID, { description: 'ID of the user creating the event.' })
  creatorId: number | string;

  @Field(() => String, { description: 'Title of the event.' })
  title: string;

  @Field(() => String, { description: 'Description of the event.' })
  description: string;

  @Field(() => String, { description: 'ISO date/time of the event.' })
  date: string;

  @Field(() => String, { description: 'Location of the event.' })
  location: string;
}
