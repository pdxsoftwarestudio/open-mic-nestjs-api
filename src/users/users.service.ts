import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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

  async findById(id: number) {
    return this.userRepository.findOneBy({ id });
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
