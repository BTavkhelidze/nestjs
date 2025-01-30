import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class RandomNextMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: Error | any) => void) {
    const randomNumber = Math.random();
    console.log(randomNumber, 'random number');
    if (randomNumber > 0.5)
      throw new BadRequestException('Please try again later');

    next();
  }
}
