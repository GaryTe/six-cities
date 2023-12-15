import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import StarsRatingComponent from './stars-rating-component';

describe('Test component "StarsRatingComponent"', () => {
  test('Correct component "StarsRatingComponent" rendering', () => {
    render(
      <BrowserRouter>
        <StarsRatingComponent/>
      </BrowserRouter>
    );

    const inputElementsList = screen.getAllByRole('radio');

    inputElementsList.forEach((input) => {
      expect(input).toBeInTheDocument();
    });

    expect(inputElementsList.length).toBe(5);
  });
});
