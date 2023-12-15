import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {MemoryRouter, Routes, Route} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import PropertyPage from './property-page';
import { Address } from '../../const';
import { offers } from '../../mocks/offers';
import { reviews } from '../../mocks/reviews';

const mockStore = configureMockStore();

const store = mockStore({
  offers: {
    offers: offers
  },
  reviews: {
    reviews: reviews
  }
});

describe('Test page "PropertyPage"', () => {
  test('Correct page "PropertyPage" rendering', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${Address.Room}3`]}>
          <Routes>
            <Route path={`${Address.Room}:idex`} element={<PropertyPage/>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const itemsImgList = screen.getAllByAltText('apartment');
    itemsImgList.forEach((item) => {
      expect(item).toBeInTheDocument();
    });

    expect(screen.getByText(/Quiet house Near of everything./)).toBeInTheDocument();
    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Other places in the neighbourhood'})).toBeInTheDocument();
  });
});
