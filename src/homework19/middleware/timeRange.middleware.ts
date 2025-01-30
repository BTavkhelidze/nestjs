import {
  BadRequestException,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class TimeRange implements NestMiddleware {
  use(req: any, res: any, next: (error?: Error | any) => void) {
    const time = new Date().getHours();

    if (time < 10 && time > 18) {
      throw new BadRequestException('Invalid time ');
    }

    next();
  }
}
