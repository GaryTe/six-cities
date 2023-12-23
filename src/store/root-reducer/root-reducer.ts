import {combineReducers} from 'redux';
import { NameReducer } from '../../const';
import { offersListSlice } from '../slice-reducer/offers-list-slice/offers-list-slice';
import { reviewsListSlice } from '../slice-reducer/reviews-list-slice/reviews-list-slice';
import { offerSlice } from '../slice-reducer/offer-slice/offer-slice';
import { offersNearbySlice } from '../slice-reducer/offers-nearby-slice/offers-nearby-slice';
import { authorizationSlice } from '../slice-reducer/authorization-slice/authorization-slice';
import { favoriteSlice } from '../slice-reducer/favorite-slice/favorite-slice';

export const rootReducer = combineReducers({
  [NameReducer.Offers]: offersListSlice.reducer,
  [NameReducer.Reviews]: reviewsListSlice.reducer,
  [NameReducer.Offer]: offerSlice.reducer,
  [NameReducer.Nearby]: offersNearbySlice.reducer,
  [NameReducer.Authorization]: authorizationSlice.reducer,
  [NameReducer.Favorite]: favoriteSlice.reducer
});
