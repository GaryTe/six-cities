import { reviewsListSlice } from './reviews-list-slice';
import {
  requestToGetReviews,
  requestForReview
} from '../../../api/request';
import { reviews } from '../../../mocks/reviews';

describe('Test slice "reviewsListSlice"', () => {
  test('Positive request on get list reviews', () => {
    const state = reviewsListSlice.getInitialState();

    expect(reviewsListSlice.reducer(
      state,
      {
        type: requestToGetReviews.fulfilled.type,
        payload: reviews
      }
    ))
      .toEqual({
        loading: false,
        reviews: reviews,
        typeError: null
      });
  });
  test('Negative request on get list reviews', () => {
    const state = reviewsListSlice.getInitialState();

    expect(reviewsListSlice.reducer(
      state,
      {
        type: requestToGetReviews.rejected.type,
        error: {}
      }
    ))
      .toEqual({
        loading: false,
        reviews: [],
        typeError: {}
      });
  });
  test('Positive request on loading review', () => {
    const state = reviewsListSlice.getInitialState();

    expect(reviewsListSlice.reducer(
      state,
      {
        type: requestForReview.pending.type,
      }
    ))
      .toEqual({
        loading: true,
        reviews: [],
        typeError: null
      });
  });
  test('Positive request on add review', () => {
    const state = reviewsListSlice.getInitialState();

    expect(reviewsListSlice.reducer(
      state,
      {
        type: requestForReview.fulfilled.type,
        payload: reviews[0]
      }
    ))
      .toEqual({
        loading: false,
        reviews: reviews[0],
        typeError: null
      });
  });
  test('Negative request on add review', () => {
    const state = reviewsListSlice.getInitialState();

    expect(reviewsListSlice.reducer(
      state,
      {
        type: requestForReview.rejected.type,
        error: {}
      }
    ))
      .toEqual({
        loading: false,
        reviews: [],
        typeError: {}
      });
  });
});
