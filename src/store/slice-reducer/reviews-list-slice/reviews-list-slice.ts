import {createSlice} from '@reduxjs/toolkit';
import { StorageReviews } from '../../../types/state';
import { RootState } from '../../store/store';
import { NameReducer } from '../../../const';
import { reviews } from '../../../mocks/reviews';

const initialState: StorageReviews = {
  reviews: reviews
};

export const reviewsListSlice = createSlice({
  name: NameReducer.Reviews,
  initialState,
  reducers: {}
});

export const storageReviews = (state: RootState) => state.reviews;
