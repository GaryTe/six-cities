import {MemoryRouter, Routes, Route} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import PropertyPage from './property-page';
import { Address } from '../../const';

describe('Test page "PropertyPage"', () => {
  test('Correct page "PropertyPage" rendering', () => {
    render(
      <MemoryRouter initialEntries={[`${Address.Room}3`]}>
        <Routes>
          <Route path={`${Address.Room}:id`} element={<PropertyPage/>} />
        </Routes>
      </MemoryRouter>
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
