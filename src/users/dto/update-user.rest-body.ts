import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class UpdateUserRestBody extends OmitType(PartialType(User), ['id']) {
  // HACK: unsure why we need to redeclare these fields, but we do
  @Field(() => String, { description: 'First name of user.' })
  firstName: string;

  @Field(() => String, { description: 'Last name of user.' })
  lastName: string;
}
