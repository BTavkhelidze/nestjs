import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class QueryParamsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, 'value');
    const { category, price, id } = value;

    if (!category || !price) return value;
    const categories = ['shopping', 'food', 'drink', 'sport'];

    if (id && (+id < 0 || !Number(id)))
      throw new BadRequestException('id must be a number');

    if (!categories.includes(category))
      throw new BadRequestException('wrong category');

    if (+price <= 0)
      throw new BadRequestException('price must be greater than 0');
    return value;
  }
}
