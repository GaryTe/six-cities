import {combineReducers} from 'redux';
import { NameReducer } from '../../const';
import { offersListSlice } from '../slice-reducer/offers-list-slice/offers-list-slice';
import { reviewsListSlice } from '../slice-reducer/reviews-list-slice/reviews-list-slice';

export const rootReducer = combineReducers({
  [NameReducer.Offers]: offersListSlice.reducer,
  [NameReducer.Reviews]: reviewsListSlice.reducer
});
