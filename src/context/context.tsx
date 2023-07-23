import {createContext, Dispatch, SetStateAction} from 'react';
import {Realm} from '@realm/react';



const GlobalContext = createContext({
  userId: {} as Realm.BSON.UUID | null,
  setUserId: {} as Dispatch<SetStateAction<Realm.BSON.UUID | null>>,
});

export default GlobalContext;
