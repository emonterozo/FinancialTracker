import {Realm} from '@realm/react';

export class Goal extends Realm.Object<Goal> {
  _id!: Realm.BSON.UUID;
  description!: string;
  date!: Date;
  balance!: number;
  amount!: number;
  notes!: string;
  static schema = {
    name: 'Goal',
    properties: {
      _id: 'uuid',
      description: 'string',
      date: 'date',
      balance: {type: 'float', default: 0},
      amount: 'float',
      notes: 'string',
    },
    primaryKey: '_id',
  };
}
