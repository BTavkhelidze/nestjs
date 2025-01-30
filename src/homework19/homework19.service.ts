import { Injectable } from '@nestjs/common';
import { CreateHomework19Dto } from './dto/create-homework19.dto';
import { UpdateHomework19Dto } from './dto/update-homework19.dto';

@Injectable()
export class Homework19Service {
  create(createHomework19Dto: CreateHomework19Dto) {
    return 'This action adds a new homework19';
  }

  findAll() {
    return `This action returns results `;
  }

  findOne(id: number) {
    return `This action returns a #${id} homework19`;
  }

  update(id: number, updateHomework19Dto: UpdateHomework19Dto) {
    return `This action updates a #${id} homework19`;
  }

  remove(id: number) {
    return `This action removes a #${id} homework19`;
  }
}
