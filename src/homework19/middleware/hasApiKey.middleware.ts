import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class HasApiKey implements NestMiddleware {
  use(req: any, res: any, next: (error?: Error | any) => void) {
    const apiKey = req.headers['token'];
    console.log(apiKey);
    if (!apiKey) {
      throw new BadRequestException("you don't have a valid excess");
    }
    next();
  }
}
