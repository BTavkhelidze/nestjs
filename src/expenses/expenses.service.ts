import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IExpenses } from './expenses.intreface';
import { NOTFOUND } from 'dns';
import { CreateDto } from './dtos/create_expenses.dto';
import { UpdateDto } from './dtos/update_expenses.dto';

@Injectable()
export class ExpensesService {
  private expenses = [
    {
      id: 1,
      category: 'shopping',
      productName: 'jacket',
      quantity: 1,
      price: 300,
      totalPrice: 300,
    },
    {
      id: 2,
      category: 'food',
      productName: 'eggs',
      quantity: 21,
      price: 10,
      totalPrice: 210,
    },
  ];

  getAll(query): IExpenses[] {
    const { category, price, id } = query;

    if (category) {
      return this.expenses.filter((exp) => exp.category === category);
    }
    if (price) {
      return this.expenses.filter((exp) => exp.price >= +price);
    }

    if (id) {
      return this.expenses.filter((expense) => expense.id === +id);
    }
    return this.expenses;
  }

  getById(id: number) {
    const expense = this.expenses.find((exp) => exp.id === id);
    if (!expense) throw new NotFoundException('Expense not found');
    return expense;
  }

  create(createDto: CreateDto) {
    const { category, productName, quantity, price } = createDto;

    if (!category || !productName || !quantity || !price)
      throw new ForbiddenException('Invalid category or product name');

    const lastId = this.expenses[this.expenses.length - 1].id || 0;

    const newExpenses = {
      id: lastId + 1,
      category,
      productName,
      quantity,
      price,
      totalPrice: quantity * price,
    };

    this.expenses.push(newExpenses);
    return newExpenses;
  }

  delete(id: number) {
    const findIndex = this.expenses.findIndex((exp) => exp.id === id);

    if (findIndex === -1) throw new NotFoundException();
    this.expenses.splice(findIndex, 1);
    return 'deleted successfully';
  }

  update(id: number, updateDTO: UpdateDto) {
    const findIndex = this.expenses.findIndex((exp) => exp.id === id);
    if (findIndex === -1) throw new NotFoundException('Expense not found');
    const { category, productName, quantity, price } = updateDTO;
    if (category) this.expenses[findIndex].category = category;
    if (productName) this.expenses[findIndex].productName = productName;
    if (quantity) {
      this.expenses[findIndex].quantity = quantity;
      this.expenses[findIndex].totalPrice =
        this.expenses[findIndex].price * quantity;
    }
    if (price) {
      this.expenses[findIndex].price = price;
      this.expenses[findIndex].totalPrice =
        this.expenses[findIndex].quantity * price;
    }
  }
}
