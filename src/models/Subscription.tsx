import {Realm} from '@realm/react';
import {Category} from './Category';

export class Subscription extends Realm.Object<Subscription> {
  _id!: Realm.BSON.UUID;
  date!: Date;
  amount!: number;
  status!: string;
  category!: Category;
  notes!: string;
  static schema = {
    name: 'Subscription',
    properties: {
      _id: 'uuid',
      date: 'date',
      amount: 'float',
      status: 'string',
      category: 'Category',
      notes: 'string',
    },
    primaryKey: '_id',
  };
}
