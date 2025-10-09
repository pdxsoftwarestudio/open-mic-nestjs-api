import { Field, InputType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(User, [
  'firstName',
  'lastName',
] as const) {
  @Field(() => String, { description: 'First name of user.' })
  firstName: string;

  @Field(() => String, { description: 'Last name of user.' })
  lastName: string;
}
