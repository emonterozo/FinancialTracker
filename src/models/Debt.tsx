import {Realm} from '@realm/react';

export class Debt extends Realm.Object<Debt> {
  _id!: Realm.BSON.UUID;
  date!: Date;
  description!: string;
  amount!: number;
  status!: string;
  notes!: string;
  static schema = {
    name: 'Debt',
    properties: {
      _id: 'uuid',
      date: 'date',
      description: 'string',
      amount: 'float',
      status: 'string',
      notes: 'string',
    },
    primaryKey: '_id',
  };
}
