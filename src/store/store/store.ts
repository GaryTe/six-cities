import {configureStore} from '@reduxjs/toolkit';
import { rootReducer } from '../root-reducer/root-reducer';
import { creatAxios } from '../../api/configuration-axios';

const api = creatAxios();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api
    }
  })
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
