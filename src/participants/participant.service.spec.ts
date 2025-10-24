import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantsService } from './participant.service';

describe('ParticipantsService', () => {
  let service: ParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipantsService],
    }).compile();

    service = module.get<ParticipantsService>(ParticipantsService);
  });

  // it('should create and retrieve an participant', () => {
  //   const createParticipantInput = {
  //     title: 'Test Participant',
  //     description: 'This is a test participant',
  //     date: '2024-07-01T10:00:00Z',
  //     location: 'Test Location',
  //     creatorId: 0,
  //   };

  //   return service.create(createParticipantInput).then((createdParticipant) => {
  //     expect(createdParticipant).toHaveProperty('id');
  //     expect(createdParticipant.title).toBe(createParticipantInput.title);

  //     return service.findOne(createdParticipant.id).then((fetchedParticipant) => {
  //       expect(fetchedParticipant).toBeDefined();
  //       expect(fetchedParticipant.id).toBe(createdParticipant.id);
  //       expect(fetchedParticipant.title).toBe(createParticipantInput.title);
  //     });
  //   });
  // });
});
