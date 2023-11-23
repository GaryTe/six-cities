import {render, screen} from '@testing-library/react';
import PropertyPage from './property-page';

describe('Test page "PropertyPage"', () => {
  test('Correct page "PropertyPage" rendering', () => {
    render(
      <PropertyPage/>
    );

    const itemsImgList = screen.getAllByAltText('studio');
    itemsImgList.forEach((item) => {
      expect(item).toBeInTheDocument();
    });

    expect(screen.getByText(/flowery and colorful./)).toBeInTheDocument();
    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Other places in the neighbourhood'})).toBeInTheDocument();
  });
});
