import { offerSlice } from './offer-slice';
import { requestToGetOffer } from '../../../api/request';
import { offers } from '../../../mocks/offers';

describe('Test slice "offerSlice"', () => {
  test('Positive request on get offer', () => {
    const state = offerSlice.getInitialState();

    expect(offerSlice.reducer(state,
      {
        type: requestToGetOffer.fulfilled.type,
        payload: offers[0]
      }
    ))
      .toEqual({
        loading: false,
        offer: offers[0],
        typeError: null
      });
  });
  test('Negative request on get offer', () => {
    const state = offerSlice.getInitialState();

    expect(offerSlice.reducer(state,
      {
        type: requestToGetOffer.rejected.type,
        error: {}
      }
    ))
      .toEqual({
        loading: false,
        offer: null,
        typeError: {}
      });
  });
});
