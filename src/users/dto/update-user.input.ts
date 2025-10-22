import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class UpdateUserInput extends PickType(User, ['id', 'email'] as const) {
  // HACK: unsure why we need to redeclare these fields, but we do
  @Field(() => Int, { description: 'Unique identifier for the user.' })
  id: number;

  @Field(() => String, { description: 'Email of user.' })
  email: string;
}
