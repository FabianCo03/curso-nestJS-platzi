import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/users.dtos';
import { User } from 'src/users/entities/users.entities';

@Injectable()
export class UsersService {
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      name: 'name of customer',
      age: 20,
      role: 'admin',
    },
  ];
  findAll() {
    return this.users;
  }
  findOne(id: number) {
    return this.users.find((item) => item.id === id);
  }
  create(payload: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }
}
