import {Realm} from '@realm/react';
import {Debt} from './Debt';

export class History extends Realm.Object<History> {
  _id!: Realm.BSON.UUID;
  date!: Date;
  amount!: number;
  debt?: Debt;
  static schema = {
    name: 'History',
    properties: {
      _id: 'uuid',
      date: 'date',
      amount: 'float',
      debt: 'Debt?',
    },
    primaryKey: '_id',
  };
}
