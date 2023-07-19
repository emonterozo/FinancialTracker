import {createRealmContext} from '@realm/react';

import {Account} from './Account';
import {Category} from './Category';
import {Debt} from './Debt';
import {Expense} from './Expense';
import {Goal} from './Goal';
import {History} from './History';
import {Income} from './Income';
import {Subscription} from './Subscription';

export const RealmContext = createRealmContext({
  schema: [
    Account,
    Category,
    Debt,
    Expense,
    Goal,
    Income,
    History,
    Subscription,
  ],
});
