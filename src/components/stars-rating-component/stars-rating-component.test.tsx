import {useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import StarsRatingComponent from './stars-rating-component';

function MockFeedbackFormComponent (): JSX.Element {
  const [rating, setRating] = useState(0);
  return(
    <StarsRatingComponent valueRating={rating} onSetRating={setRating}/>
  );
}

describe('Test component "StarsRatingComponent"', () => {
  test('Correct component "StarsRatingComponent" rendering', () => {
    render(
      <BrowserRouter>
        <MockFeedbackFormComponent/>
      </BrowserRouter>
    );

    const inputElementsList = screen.getAllByRole('radio');

    inputElementsList.forEach((input) => {
      expect(input).toBeInTheDocument();
    });

    expect(inputElementsList.length).toBe(5);
  });
});
