import {
  favoriteSlice,
  resetError
} from './favorite-slice';
import {
  requestOffersListFavorite,
  requestChangesStatus
} from '../../../api/request';
import { offers } from '../../../mocks/offers';

describe('Test slice "favoriteSlice"', () => {
  test('Reset error.', () => {

    const state = {
      loading: true,
      offersList: [],
      typeError: {}
    };

    expect(favoriteSlice.reducer(state, resetError()))
      .toEqual({
        loading: true,
        offersList: [],
        typeError: null
      });
  });
  test('Positive request add list favorite offers', () => {
    const state = favoriteSlice.getInitialState();

    expect(favoriteSlice.reducer(state,
      {
        type: requestOffersListFavorite.fulfilled.type,
        payload: offers
      }
    )).toEqual({
      loading: false,
      offersList: offers,
      typeError: null
    });
  });
  test('Negative request add list favorite offers', () => {
    const state = favoriteSlice.getInitialState();

    expect(favoriteSlice.reducer(state,
      {
        type: requestOffersListFavorite.rejected.type,
        error: {}
      }
    )).toEqual({
      loading: false,
      offersList: [],
      typeError: {}
    });
  });
  test('Request pending changes status favorite offer', () => {
    const state = favoriteSlice.getInitialState();

    expect(favoriteSlice.reducer(state,
      {
        type: requestChangesStatus.pending.type,
      }
    )).toEqual({
      loading: true,
      offersList: [],
      typeError: null
    });
  });
  test('Add favorite offer in list favorite', () => {
    const state = favoriteSlice.getInitialState();

    const [ferstOffer] = offers;
    const mockOffer = {
      ...ferstOffer,
      isFavorite: true
    };

    expect(favoriteSlice.reducer(state,
      {
        type: requestChangesStatus.fulfilled.type,
        payload: mockOffer
      }
    )).toEqual({
      loading: false,
      offersList: [mockOffer],
      typeError: null
    });

  });
  test('Deletion favorite offer from list favorite', () => {

    const state = {
      loading: false,
      offersList: [...offers],
      typeError: null
    };

    expect(favoriteSlice.reducer(state,
      {
        type: requestChangesStatus.fulfilled.type,
        payload: offers[0]
      }
    )).toEqual({
      loading: false,
      offersList: [...offers.slice(1)],
      typeError: null
    });

  });
  test('Negative request change status favorite offer', () => {
    const state = favoriteSlice.getInitialState();

    expect(favoriteSlice.reducer(state,
      {
        type: requestChangesStatus.rejected.type,
        error: {}
      }
    )).toEqual({
      loading: false,
      offersList: [],
      typeError: {}
    });
  });
});
