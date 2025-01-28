import { IsNumber, IsString } from 'class-validator';

export class IProducts {
  id: number;
  name: string;

  price: number;

  category: string;

  createdAt: string;
}
