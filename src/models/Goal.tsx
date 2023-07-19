import {Realm} from '@realm/react';

export class Goal extends Realm.Object<Goal> {
  _id!: Realm.BSON.UUID;
  description!: string;
  start_date!: Date;
  balance!: number;
  amount!: number;
  notes!: string;
  static schema = {
    name: 'Goal',
    properties: {
      _id: 'uuid',
      description: 'string',
      start_date: 'date',
      balance: 'float',
      amount: 'float',
      notes: 'string',
    },
    primaryKey: '_id',
  };
}
