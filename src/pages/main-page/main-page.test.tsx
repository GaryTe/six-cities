import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import MainPage from './main-page';
import { mockOffersForPrice } from '../../util/mock-util';

const mockStore = configureMockStore();

const store = mockStore({
  offers: {
    offers: mockOffersForPrice,
    changeOffers: [mockOffersForPrice[0]]
  }
});

describe('Test page "MainPage"', () => {
  test('Correct page "MainPage" rendering', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainPage/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Places')).toBeInTheDocument();
    expect(screen.getByText(/1 place/i)).toBeInTheDocument();
    expect(screen.getByText('The Pondhouse - A Magical Place')).toBeInTheDocument();
  });
});
