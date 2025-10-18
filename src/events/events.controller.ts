import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Event } from './entities/event.entity';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Event | null> {
    return this.eventsService.findOne(id);
  }

  @Post()
  async create(@Body() createEventInput: CreateEventInput): Promise<Event> {
    return this.eventsService.create(createEventInput);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventInput: UpdateEventInput,
  ): Promise<Event | null> {
    return this.eventsService.update(id, updateEventInput);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.eventsService.remove(id);
  }
}
