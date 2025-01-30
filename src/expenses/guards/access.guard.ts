import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const res = context.switchToHttp().getRequest();
    const date = new Date().getDate();
    if (date === 26) {
      return false;
    }

    return true;
  }
}
