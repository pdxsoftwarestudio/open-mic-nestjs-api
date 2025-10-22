import { Field, InputType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(User, ['email'] as const) {
  @Field(() => String, { description: 'Email of user.' })
  email: string;

  @Field(() => String, { description: 'Hashed password of user.' })
  hashedPassword: string;
}
