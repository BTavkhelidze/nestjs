import { PartialType } from '@nestjs/mapped-types';
import { CreateHomework19Dto } from './create-homework19.dto';

export class UpdateHomework19Dto extends PartialType(CreateHomework19Dto) {}
