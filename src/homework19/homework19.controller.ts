import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Homework19Service } from './homework19.service';
import { CreateHomework19Dto } from './dto/create-homework19.dto';
import { UpdateHomework19Dto } from './dto/update-homework19.dto';

@Controller('homework19')
export class Homework19Controller {
  constructor(private readonly homework19Service: Homework19Service) {}

  @Post()
  create(@Body() createHomework19Dto: CreateHomework19Dto) {
    return this.homework19Service.create(createHomework19Dto);
  }

  @Get()
  findAll() {
    return this.homework19Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homework19Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHomework19Dto: UpdateHomework19Dto) {
    return this.homework19Service.update(+id, updateHomework19Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homework19Service.remove(+id);
  }
}
