import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsService],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  // it('should create and retrieve an event', () => {
  //   const createEventInput = {
  //     title: 'Test Event',
  //     description: 'This is a test event',
  //     date: '2024-07-01T10:00:00Z',
  //     location: 'Test Location',
  //     creatorId: 0,
  //   };

  //   return service.create(createEventInput).then((createdEvent) => {
  //     expect(createdEvent).toHaveProperty('id');
  //     expect(createdEvent.title).toBe(createEventInput.title);

  //     return service.findOne(createdEvent.id).then((fetchedEvent) => {
  //       expect(fetchedEvent).toBeDefined();
  //       expect(fetchedEvent.id).toBe(createdEvent.id);
  //       expect(fetchedEvent.title).toBe(createEventInput.title);
  //     });
  //   });
  // });
});
