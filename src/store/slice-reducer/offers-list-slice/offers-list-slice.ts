import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { StorageOffers } from '../../../types/state';
import { RootState } from '../../store/store';
import { NameReducer } from '../../../const';
import { getSortOffersByCity } from '../../../util/util';
import { CitiesList } from '../../../const';
import { requestToGetOffersList } from '../../../api/request';

const initialState: StorageOffers = {
  loading: true,
  cityName: CitiesList.Paris,
  offers: [],
  changeOffers: [],
  typeError: null
};

export const offersListSlice = createSlice({
  name: NameReducer.Offers,
  initialState,
  reducers: {
    changeNameCity: (state, action: PayloadAction<string>) => {
      state.cityName = action.payload;
      state.changeOffers = getSortOffersByCity({
        offersList: state.offers,
        nameCitie: action.payload
      });
    }
  },
  extraReducers:(builder) => {
    builder
      .addCase(requestToGetOffersList.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.changeOffers = getSortOffersByCity({
          offersList: action.payload,
          nameCitie: state.cityName
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
export const {changeNameCity} = offersListSlice.actions;
