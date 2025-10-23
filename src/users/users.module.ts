import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EventsModule } from 'src/events/events.module';
import { userProviders } from './user.provider';
import { UsersController } from './users.controller';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule, EventsModule],
  providers: [UsersResolver, UsersService, ...userProviders],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
