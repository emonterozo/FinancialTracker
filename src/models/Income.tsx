import {Realm} from '@realm/react';

export class Income extends Realm.Object<Income> {
  _id!: Realm.BSON.UUID;
  date!: Date;
  description!: string;
  amount!: number;
  notes!: string;
  static schema = {
    name: 'Income',
    properties: {
      _id: 'uuid',
      date: 'date',
      description: 'string',
      amount: 'float',
      notes: 'string',
    },
    primaryKey: '_id',
  };
}
