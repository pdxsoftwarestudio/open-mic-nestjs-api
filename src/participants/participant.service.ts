import { Inject, Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateParticipantInput } from './dto/create-participant.input';
import { UpdateParticipantInput } from './dto/update-participant.input';
import { Participant } from './entities/participant.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    @Inject('PARTICIPANT_REPOSITORY')
    private participantRepository: Repository<Participant>,
  ) {}

  async create(createParticipantInput: CreateParticipantInput) {
    return this.participantRepository.save({
      ...createParticipantInput,
      event: {
        id:
          typeof createParticipantInput.eventId === 'string'
            ? parseInt(createParticipantInput.eventId)
            : createParticipantInput.eventId,
      },
    });
  }

  async findAll() {
    return this.participantRepository.find();
  }

  async findOne(options: FindOneOptions<Participant>) {
    return this.participantRepository.findOne(options);
  }

  async update(id: number, updateParticipantInput: UpdateParticipantInput) {
    return this.participantRepository.save({
      id,
      ...updateParticipantInput,
    });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.participantRepository.delete(id);

    return result.affected > 0;
  }
}
