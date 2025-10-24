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
import { CreateParticipantInput } from './dto/create-participant.input';
import { UpdateParticipantInput } from './dto/update-participant.input';
import { Participant } from './entities/participant.entity';
import { ParticipantsService } from './participant.service';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Get()
  async findAll(): Promise<Participant[]> {
    return this.participantsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Participant | null> {
    return this.participantsService.findOne({
      where: { id },
      select: { id: true },
    });
  }

  @Post()
  async create(
    @Body() createParticipantInput: CreateParticipantInput,
  ): Promise<Participant> {
    return this.participantsService.create(createParticipantInput);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParticipantInput: UpdateParticipantInput,
  ): Promise<Participant | null> {
    return this.participantsService.update(id, updateParticipantInput);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.participantsService.remove(id);
  }
}
