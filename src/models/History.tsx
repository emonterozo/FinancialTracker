import {Realm} from '@realm/react';
import {Debt} from './Debt';
import {Goal} from './Goal';

export class History extends Realm.Object<History> {
  _id!: Realm.BSON.UUID;
  date!: Date;
  amount!: number;
  goal?: Goal;
  debt?: Debt;
  static schema = {
    name: 'History',
    properties: {
      _id: 'uuid',
      date: 'date',
      amount: 'float',
      goal: 'Goal?',
      debt: 'Debt?',
    },
    primaryKey: '_id',
  };
}
