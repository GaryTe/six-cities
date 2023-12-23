import {createSlice} from '@reduxjs/toolkit';
import { StorageOffersListNearby } from '../../../types/state';
import { RootState } from '../../store/store';
import { NameReducer } from '../../../const';
import { requestToGetOffersNearby } from '../../../api/request';

const initialState: StorageOffersListNearby = {
  loading: true,
  offersListNearby: [],
  typeError: null
};

export const offersNearbySlice = createSlice({
  name: NameReducer.Nearby,
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder
      .addCase(requestToGetOffersNearby.fulfilled, (state, action) => {
        state.offersListNearby = action.payload;
        state.loading = false;
      })
      .addCase(requestToGetOffersNearby.rejected, (state, action) => {
        state.typeError = action.error;
        state.loading = false;
      });
  }
});

export const storageOffersNearby = (state: RootState) => state.nearby;
