import {createSlice} from '@reduxjs/toolkit';
import { StorageReviews } from '../../../types/state';
import { RootState } from '../../store/store';
import { NameReducer } from '../../../const';
import {
  requestToGetReviews,
  requestForReview
} from '../../../api/request';

const initialState: StorageReviews = {
  loading: true,
  reviews: [],
  typeError: null
};

export const reviewsListSlice = createSlice({
  name: NameReducer.Reviews,
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder
      .addCase(requestToGetReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(requestToGetReviews.rejected, (state, action) => {
        state.typeError = action.error;
        state.loading = false;
      })
      .addCase(requestForReview.pending, (state) => {
        state.typeError = null;
        state.loading = true;
      })
      .addCase(requestForReview.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(requestForReview.rejected, (state, action) => {
        state.typeError = action.error;
        state.loading = false;
      });
  }
});

export const storageReviews = (state: RootState) => state.reviews;
