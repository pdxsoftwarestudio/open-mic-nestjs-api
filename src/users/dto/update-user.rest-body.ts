import { Field, ID, InputType } from '@nestjs/graphql';
import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

@InputType()
export class UpdateUserRestBody extends PickType(User, [
  'id',
  'email',
] as const) {
  @Field(() => ID, { description: 'Unique identifier for the user.' })
  id: number;

  @Field(() => String, { description: 'Email of user.' })
  email: string;
}
