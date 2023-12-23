import {createSlice} from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { StorageOffer } from '../../../types/state';
import { requestToGetOffer } from '../../../api/request';
import { NameReducer } from '../../../const';


const initialState: StorageOffer = {
  loading: true,
  offer: null,
  typeError: null
};

export const offerSlice = createSlice({
  name: NameReducer.Offer,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestToGetOffer.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.loading = false;
      })
      .addCase(requestToGetOffer.rejected, (state, action) => {
        state.typeError = action.error;
        state.loading = false;
      });
  }
});

export const storageOffer = (state: RootState) => state.offer;
