import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ParticipantsController } from './participant.controller';
import { participantProviders } from './participant.provider';
import { ParticipantsResolver } from './participant.resolver';
import { ParticipantsService } from './participant.service';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [DatabaseModule, EventsModule],
  controllers: [ParticipantsController],
  exports: [ParticipantsService],
  providers: [
    ParticipantsService,
    ParticipantsResolver,
    ...participantProviders,
  ],
})
export class ParticipantsModule {}
