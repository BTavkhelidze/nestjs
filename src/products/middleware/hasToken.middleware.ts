import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class HasToken implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['token'];
    if (!token) throw new BadRequestException('invalid token');
    next();
  }
}
