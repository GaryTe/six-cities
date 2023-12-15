import {createSlice} from '@reduxjs/toolkit';
import { StorageOffers } from '../../../types/state';
import { RootState } from '../../store/store';
import { NameReducer } from '../../../const';
import { getSortOffersByCity } from '../../../util/util';
import { CitiesList } from '../../../const';
import { offers } from '../../../mocks/offers';

const initialState: StorageOffers = {
  offers: offers,
  changeOffers: []
};

export const offersListSlice = createSlice({
  name: NameReducer.Offers,
  initialState,
  reducers: {
    filterOffersByCity: (state) => {
      state.changeOffers = getSortOffersByCity({
        offersList: offers,
        nameCitie: CitiesList.Paris
      });
    }
  }
});

export const {filterOffersByCity} = offersListSlice.actions;

export const storageOffers = (state: RootState) => state.offers;
