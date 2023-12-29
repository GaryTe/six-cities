import { offersNearbySlice } from './offers-nearby-slice';
import { requestToGetOffersNearby } from '../../../api/request';
import { offers } from '../../../mocks/offers';

describe('Test slice "offersNearbySlice"', () => {
  test('Positive request on get list offers nearby', () => {
    const state = offersNearbySlice.getInitialState();

    expect(offersNearbySlice.reducer(
      state,
      {
        type: requestToGetOffersNearby.fulfilled.type,
        payload: offers
      }
    ))
      .toEqual({
        loading: false,
        offersListNearby: offers,
        typeError: null
      });
  });
  test('Negative request on get list offers nearby', () => {
    const state = offersNearbySlice.getInitialState();

    expect(offersNearbySlice.reducer(
      state,
      {
        type: requestToGetOffersNearby.rejected.type,
        error: {}
      }
    ))
      .toEqual({
        loading: false,
        offersListNearby: [],
        typeError: {}
      });
  });
});
