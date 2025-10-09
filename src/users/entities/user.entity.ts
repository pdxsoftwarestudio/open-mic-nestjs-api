import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'Unique identifier for the user.' })
  id: number;

  @Field(() => String, { description: 'First name of user.' })
  firstName: string;

  @Field(() => String, { description: 'Last name of user.' })
  lastName: string;
}
