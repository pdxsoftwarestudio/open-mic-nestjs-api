import { Inject, Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @Inject('EVENT_REPOSITORY')
    private eventRepository: Repository<Event>,
  ) {}

  async create(createEventInput: CreateEventInput) {
    return this.eventRepository.save({
      ...createEventInput,
      creator: {
        id:
          typeof createEventInput.creatorId === 'string'
            ? parseInt(createEventInput.creatorId)
            : createEventInput.creatorId,
      },
    });
  }

  async findAll() {
    return this.eventRepository.find();
  }

  async findOne(options: FindOneOptions<Event>) {
    return this.eventRepository.findOne(options);
  }

  async update(id: number, updateEventInput: UpdateEventInput) {
    return this.eventRepository.save({
      id,
      ...updateEventInput,
    });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.eventRepository.delete(id);

    return result.affected > 0;
  }
}
