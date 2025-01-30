import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { QueryParamsPipe } from './pipes/query.pipe';
import { CreateDto } from './dtos/create_expenses.dto';
import { UpdateDto } from './dtos/update_expenses.dto';
import { AccessGuard } from './guards/access.guard';
import { HasEmailToCrate } from './guards/HasEmailToCreate.guard';

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Get()
  @UseGuards(AccessGuard)
  getAll(@Query() query) {
    return this.expensesService.getAll(query);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id) {
    return this.expensesService.getById(id);
  }

  @Post()
  @UseGuards(HasEmailToCrate)
  create(@Body() createDto: CreateDto) {
    return this.expensesService.create(createDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    console.log(id + ' deleted');
    return this.expensesService.delete(+id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id, @Body() updateDto: UpdateDto) {
    return this.expensesService.update(+id, updateDto);
  }
}
