import {Realm} from '@realm/react';

export class Category extends Realm.Object<Category> {
  _id!: Realm.BSON.UUID;
  category!: string;
  static schema = {
    name: 'Category',
    properties: {
      _id: 'uuid',
      category: 'string',
    },
    primaryKey: '_id',
  };
}
