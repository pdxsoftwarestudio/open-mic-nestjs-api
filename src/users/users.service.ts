import { Inject, Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    return this.userRepository.save(createUserInput);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(options: FindOneOptions<User>) {
    return this.userRepository.findOne(options);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    return this.userRepository.save({
      id,
      ...updateUserInput,
    });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);

    return result.affected > 0;
  }
}
