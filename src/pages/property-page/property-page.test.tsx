import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {MemoryRouter, Routes, Route} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import PropertyPage from './property-page';
import { Address } from '../../const';
import { offers } from '../../mocks/offers';
import { AuthorizationStatus } from '../../const';

const mockStore = configureMockStore();

describe('Test page "PropertyPage"', () => {
  test('Correct page "PropertyPage" rendering', () => {
    const scroll = jest.spyOn(window, 'scrollTo').mockImplementation(() => 0);

    render(
      <Provider store={ mockStore({
        offer: {
          offer: offers[0],
          typeError: null
        },
        nearby: {
          loading: false,
          offersListNearby: offers,
          typeError: null
        },
        authorization: {
          isAuthorizationStatus: AuthorizationStatus.Auth,
          dataAuthorization: {
            avatarUrl: null,
            email: 'vlad@vankov.ru'
          }
        },
        favorite: {
          offersList: offers[0]
        },
        reviews: {
          loading: false,
          reviews: [],
          typeError: null
        }
      })}
      >
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

    expect(screen.getByText(/from making local coffee by drip in the morning,/)).toBeInTheDocument();
    expect(screen.getByText('No reviews.')).toBeInTheDocument();
    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Other places in the neighbourhood'})).toBeInTheDocument();
    expect(screen.getByAltText('The Pondhouse - A Magical Place')).toBeInTheDocument();
    expect(scroll).toBeCalled();
  });
});
