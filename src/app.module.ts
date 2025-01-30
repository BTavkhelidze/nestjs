import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ProductsModule } from './products/products.module';
import { Homework19Module } from './homework19/homework19.module';

@Module({
  imports: [UsersModule, ExpensesModule, ProductsModule, Homework19Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
