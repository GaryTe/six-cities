import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import ReviewComponent from './review-component';
import { reviews } from '../../mocks/reviews';

const mockStore = configureMockStore();

describe('Test component "ReviewComponent"', () => {
  test('Correct component "ReviewComponent" rendering', () => {
    const store = mockStore({
      reviews: {
        loading: false,
        reviews: reviews,
        typeError: null
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewComponent/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Reviews ·')).toBeInTheDocument();

    const images = screen.getAllByAltText('Reviews avatar');
    images.forEach((image) => {
      expect(image).toBeInTheDocument();
    });

    const comments = screen.getAllByText(/The sauna and spa were closed for lunar new year holiday./);
    comments.forEach((commet) => {
      expect(commet).toBeInTheDocument();
    });
  });
  test('If there are no reviews then rendering "No reviews"',() => {
    const store = mockStore({
      reviews: {
        loading: false,
        reviews: [],
        typeError: null
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewComponent/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('No reviews.')).toBeInTheDocument();
  });
});
