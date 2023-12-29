import {
  offersListSlice,
  changeNameCity
} from './offers-list-slice';
import { requestToGetOffersList } from '../../../api/request';
import { offers } from '../../../mocks/offers';
import { CitiesList } from '../../../const';

describe('Test slice "offersListSlice"', () => {
  test('Change name city', () => {
    const state = {
      loading: true,
      cityName: CitiesList.Paris,
      offers: offers,
      changeOffers: [],
      typeError: null
    };

    expect(offersListSlice.reducer(state, changeNameCity(CitiesList.Dusseldorf)))
      .toEqual({
        loading: true,
        cityName: CitiesList.Dusseldorf,
        offers: offers,
        changeOffers: [offers[0]],
        typeError: null
      });
  });
  test('Positive request on get list offers', () => {
    const state = offersListSlice.getInitialState();

    expect(offersListSlice.reducer(
      state,
      {
        type: requestToGetOffersList.fulfilled.type,
        payload: offers
      }
    ))
      .toEqual({
        loading: false,
        cityName: CitiesList.Paris,
        offers: offers,
        changeOffers: [offers[1]],
        typeError: null
      });
  });
  test('Negative request on get list offers', () => {
    const state = offersListSlice.getInitialState();

    expect(offersListSlice.reducer(
      state,
      {
        type: requestToGetOffersList.rejected.type,
        error: {}
      }
    ))
      .toEqual({
        loading: false,
        cityName: CitiesList.Paris,
        offers: [],
        changeOffers: [],
        typeError: {}
      });
  });
});
