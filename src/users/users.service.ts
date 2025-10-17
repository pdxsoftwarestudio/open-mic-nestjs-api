import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { mockUserIdFactory, mockUserList } from './users.mocks';

@Injectable()
export class UsersService {
  create(createUserInput: CreateUserInput) {
    const mockUserId = mockUserIdFactory();

    const newUser: User = {
      id: mockUserId,
      firstName: createUserInput.firstName,
      lastName: createUserInput.lastName,
    };

    mockUserList.push(newUser);

    return newUser;
  }

  findAll() {
    return mockUserList;
  }

  findOne(id: number) {
    return mockUserList.find((user) => user.id === id);
  }

  update(id: number, updateUserInput: UpdateUserInput): User {
    const user = mockUserList.find((user) => user.id === id);

    user.firstName = updateUserInput.firstName ?? user.firstName;
    user.lastName = updateUserInput.lastName ?? user.lastName;

    return user;
  }

  remove(id: number): boolean {
    const indexToRemove = mockUserList.findIndex((user) => user.id === id);

    if (indexToRemove !== -1) {
      mockUserList.splice(indexToRemove, 1);
    }

    return indexToRemove !== -1;
  }
}
