import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateDto } from './dtos/update.dto';
import { IUser } from './users.interface';

@Injectable()
export class UsersService {
  private users: IUser[] = [
    {
      id: 1,
      firstName: 'Beqa',
      lastName: 'tavkhelidze',
      email: 'beqatavkhelidze4@gmail.com',
      phoneNumber: '+995 598 533 992',
      gender: 'male',
    },
    {
      id: 2,
      firstName: 'Ilia',
      lastName: 'Topuria',
      email: 'beqatavkhelidze4@gmail.com',
      phoneNumber: '+995 590 233 992',
      gender: 'male',
    },
  ];

  getAll() {
    return this.users;
  }

  getById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const { email, gender, firstName, lastName, phoneNumber } = createUserDto;
    if (!email || !gender || !firstName || !lastName || !phoneNumber)
      throw new HttpException(
        'every field must be a valid',
        HttpStatus.BAD_REQUEST,
      );
    const lastId = this.users[this.users.length - 1]?.id || 0;
    const newUser = {
      id: lastId + 1,
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateDto: UpdateDto) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1)
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    const { email, gender, firstName, lastName, phoneNumber } = updateDto;
    if (email) this.users[index].email = email;
    if (gender) this.users[index].gender = gender;
    if (firstName) this.users[index].firstName = firstName;
    if (lastName) this.users[index].lastName = lastName;
    if (phoneNumber) this.users[index].phoneNumber = phoneNumber;

    return this.users[index];
  }

  delete(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1)
      throw new HttpException('users not found', HttpStatus.NOT_FOUND);
    this.users.splice(index, 1);
    return 'user deleted successfully';
  }
}
