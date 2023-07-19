import {Realm} from '@realm/react';
import {Category} from './Category';

export class Expense extends Realm.Object<Expense> {
  _id!: Realm.BSON.UUID;
  date!: Date;
  description!: string;
  amount!: number;
  category!: Category;
  notes!: string;
  static schema = {
    name: 'Expense',
    properties: {
      _id: 'uuid',
      date: 'date',
      description: 'string',
      amount: 'float',
      category: 'Category',
      notes: 'string',
    },
    primaryKey: '_id',
  };
}
