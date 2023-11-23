import {render, screen} from '@testing-library/react';
import OffersListComponent from './offers-list-component';

describe('Test component "OffersListComponent"', () => {
  test('Correct component "OffersListComponent" rendering', () => {
    render(
      <OffersListComponent/>
    );

    const itemsOfferList = screen.getAllByRole('listitem');
    itemsOfferList.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });
});
