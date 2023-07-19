import {Realm} from '@realm/react';

export interface IOption {
  label: string;
  value: Realm.BSON.UUID | string;
}
