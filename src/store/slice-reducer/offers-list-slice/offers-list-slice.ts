import {createSlice} from '@reduxjs/toolkit';
import { StorageOffers } from '../../../types/state';
import { RootState } from '../../store/store';
import { NameReducer } from '../../../const';
import { getSortOffersByCity } from '../../../util/util';
import { CitiesList } from '../../../const';
import { requestToGetOffersList } from '../../../api/request';

const initialState: StorageOffers = {
  loading: true,
  offers: [],
  changeOffers: [],
  typeError: null
};

export const offersListSlice = createSlice({
  name: NameReducer.Offers,
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder
      .addCase(requestToGetOffersList.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.changeOffers = getSortOffersByCity({
          offersList: action.payload,
          nameCitie: CitiesList.Paris
        });
        state.loading = false;
      })
      .addCase(requestToGetOffersList.rejected, (state, action) => {
        state.typeError = action.error;
        state.loading = false;
      });
  }
});

export const storageOffers = (state: RootState) => state.offers;
