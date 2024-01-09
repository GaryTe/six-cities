import {createSlice} from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { StorageOffersListFavorite } from '../../../types/state';
import {
  requestOffersListFavorite,
  requestChangesStatus,
  requestEndUserSession
} from '../../../api/request';
import { NameReducer } from '../../../const';


const initialState: StorageOffersListFavorite = {
  loading: true,
  offersList: [],
  typeError: null
};

export const favoriteSlice = createSlice({
  name: NameReducer.Favorite,
  initialState,
  reducers: {
    resetError: (state) => {state.typeError = null;}
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestOffersListFavorite.fulfilled, (state, action) => {
        state.offersList = action.payload;
        state.loading = false;
      })
      .addCase(requestOffersListFavorite.rejected, (state, action) => {
        state.typeError = action.error;
        state.loading = false;
      })
      .addCase(requestChangesStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestChangesStatus.fulfilled, (state, action) => {
        if(action.payload.isFavorite) {
          state.offersList.push(action.payload);
        } else {
          const index = state.offersList.findIndex((offer) => offer.id === action.payload.id);
          if(index === -1) {return;}

          state.offersList = [
            ...state.offersList.slice(0, index),
            ...state.offersList.slice(index + 1)
          ];
        }
        state.loading = false;
      })
      .addCase(requestChangesStatus.rejected, (state, action) => {
        state.typeError = action.error;
        state.loading = false;
      })
      .addCase(requestEndUserSession.fulfilled, (state) => {
        state.offersList = [];
      });
  }
});

export const storageOffersListFavorite = (state: RootState) => state.favorite;
export const {resetError} = favoriteSlice.actions;
