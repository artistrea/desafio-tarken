import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(email: string, hashed_password: string): Promise<User> {
    const user = this.usersRepository.create({
      email,
      hashed_password,
    });

    return this.usersRepository.save(user);
  }

  async findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }
}
