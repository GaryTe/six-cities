import {configureMockStore} from '@jedmao/redux-mock-store';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import FavoritesPage from './favorites-page';
import { offers } from '../../mocks/offers';
import { AuthorizationStatus } from '../../const';

const mockStore = configureMockStore();

describe('Test page "FavoritesPage"', () => {
  test('Correct page "FavoritesPage" rendering', () => {
    render(
      <Provider store={mockStore(
        {
          favorite: {
            loading: false,
            offersList: [offers[0]],
            typeError: null
          },
          authorization: {
            isAuthorizationStatus: AuthorizationStatus.Auth,
            dataAuthorization: {
              avatarUrl: null,
              email: 'vlad@vankov.ru',
            },
            typeError: null
          }
        }
      )}
      >
        <BrowserRouter>
          <FavoritesPage/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('link', {name: 'vlad@vankov.ru 1'})).toBeInTheDocument();

    expect(screen.getByRole('heading', {name: 'Saved listing'})).toBeInTheDocument();

    expect(screen.getByAltText('Wood and stone place')).toBeInTheDocument();

    const itemsImageLogoList = screen.getAllByAltText('6 cities logo');
    itemsImageLogoList.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });
});
