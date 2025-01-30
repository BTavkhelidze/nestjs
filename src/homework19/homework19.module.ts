import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { Homework19Service } from './homework19.service';
import { Homework19Controller } from './homework19.controller';
import { RandomNextMiddleware } from './middleware/random.middleware';
import { TimeRange } from './middleware/timeRange.middleware';
import { HasApiKey } from './middleware/hasApiKey.middleware';

@Module({
  controllers: [Homework19Controller],
  providers: [Homework19Service],
})
export class Homework19Module implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RandomNextMiddleware)
      .forRoutes({ path: 'Homework19', method: RequestMethod.GET });

    consumer.apply(TimeRange).forRoutes('homework19');

    consumer
      .apply(HasApiKey)
      .forRoutes({ path: `/Homework19/:id`, method: RequestMethod.DELETE });
  }
}
