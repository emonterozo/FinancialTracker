import {Realm} from '@realm/react';

export class History extends Realm.Object<History> {
  _id!: Realm.BSON.UUID;
  date!: Date;
  description!: string;
  amount!: number;
  notes!: string;
  category!: string;
  static schema = {
    name: 'History',
    properties: {
      _id: 'uuid',
      date: 'date',
      description: 'string',
      amount: 'float',
      notes: 'string',
      category: 'string',
    },
    primaryKey: '_id',
  };
}
