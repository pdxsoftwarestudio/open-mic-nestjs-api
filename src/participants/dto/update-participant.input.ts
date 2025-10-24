import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateParticipantInput } from './create-participant.input';

@InputType()
export class UpdateParticipantInput extends PartialType(
  CreateParticipantInput,
) {
  @Field(() => Int, { description: 'ID of the participant to update.' })
  id: number;
}
