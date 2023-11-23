import {render, screen} from '@testing-library/react';
import CardPlaceComponent from './card-place-component';

describe('Test component "CardPlaceComponent"', () => {
  test('Correct component "CardPlaceComponent" rendering', () => {
    render(
      <CardPlaceComponent/>
    );

    const itemsRatingList = screen.getAllByText('Rating');
    itemsRatingList.forEach((item) => {
      expect(item).toBeInTheDocument();
    });

    const itemsPremiumList = screen.getAllByText('Premium');
    itemsPremiumList.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });
});
