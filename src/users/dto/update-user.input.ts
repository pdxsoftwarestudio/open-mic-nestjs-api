import {
  Field,
  InputType,
  Int,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class UpdateUserInput extends IntersectionType(
  OmitType(PartialType(User), ['id']),
  PickType(User, ['id']),
) {
  // HACK: unsure why we need to redeclare these fields, but we do
  @Field(() => Int, { description: 'Unique identifier for the user.' })
  id: number;

  @Field(() => String, { description: 'First name of user.' })
  firstName: string;

  @Field(() => String, { description: 'Last name of user.' })
  lastName: string;
}
