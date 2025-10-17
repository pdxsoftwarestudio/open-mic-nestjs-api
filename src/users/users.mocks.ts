import {
  incrementalNumber,
  randFirstName,
  randLastName,
  seed,
  toCollection,
} from '@ngneat/falso';

seed('users-mocks');

export const mockUserIdFactory = incrementalNumber({ from: 0, step: 1 });

export const mockUserList = toCollection(
  () => ({
    id: mockUserIdFactory(),
    firstName: randFirstName(),
    lastName: randLastName(),
  }),
  { length: 100 },
);

// Reset random seed
seed();
