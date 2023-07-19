import {Realm} from '@realm/react';

export class Account extends Realm.Object<Account> {
  _id!: Realm.BSON.UUID;
  amount!: number;
  static schema = {
    name: 'Account',
    properties: {
      _id: 'uuid',
      amount: 'float',
    },
    primaryKey: '_id',
  };
}
