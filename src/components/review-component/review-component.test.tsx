import {render, screen} from '@testing-library/react';
import ReviewComponent from './review-component';
import { reviews } from '../../mocks/reviews';
import { mockReviews } from '../../util/mock-util';

jest.mock('../../mocks/reviews');

describe('Test component "ReviewComponent"', () => {
  test('Correct component "ReviewComponent" rendering', () => {
    reviews.push(...mockReviews);

    render(<ReviewComponent/>);

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
  test('If the array is null then rendering "No reviews"',() => {
    reviews.shift();
    reviews.shift();
    reviews.shift();

    render(<ReviewComponent/>);

    expect(screen.getByText('No reviews.')).toBeInTheDocument();
  });
});
