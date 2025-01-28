import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class QueryProductsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value.category || !value.price) return value;

    if (+value.price <= 0)
      throw new BadRequestException('price must be greater than 0');

    return value;
  }
}
