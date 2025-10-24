import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EventsController } from './events.controller';
import { eventProviders } from './events.provider';
import { EventsResolver } from './events.resolver';
import { EventsService } from './events.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EventsController],
  exports: [EventsService],
  providers: [EventsService, EventsResolver, ...eventProviders],
})
export class EventsModule {}
