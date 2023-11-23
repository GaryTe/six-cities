import {render, screen} from '@testing-library/react';
import FavoritesPage from './favorites-page';

describe('Test page "FavoritesPage"', () => {
  test('Correct page "FavoritesPage" rendering', () => {
    render(
      <FavoritesPage/>
    );

    expect(screen.getByRole('heading', {name: 'Saved listing'})).toBeInTheDocument();

    const itemsImagePlaceList = screen.getAllByAltText('Place');
    itemsImagePlaceList.forEach((item) => {
      expect(item).toBeInTheDocument();
    });

    const itemsImageLogoList = screen.getAllByAltText('6 cities logo');
    itemsImageLogoList.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });
});
