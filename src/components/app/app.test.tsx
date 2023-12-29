import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import MainPage from '../../pages/main-page/main-page';
import PropertyPage from '../../pages/property-page/property-page';
import PrivateRouteComponent from '../private-route-componente/private-route-component';
import LoginPage from '../../pages/login-page/login-page';
import ErrorComponent from '../error-component/error-component';
import {
  Address,
  AuthorizationStatus
} from '../../const';
import { mockOffersForPrice } from '../../util/mock-util';
import { reviews } from '../../mocks/reviews';

jest.mock('../../pages/property-page/property-page', () => function MockPropertyPage(): JSX.Element {
  return (
    <div>
      <p>Baby seat</p>
      <p>Angelina</p>
    </div>
  );
});


const mockStore = configureMockStore();

const store = mockStore({
  offers: {
    offers: mockOffersForPrice,
    changeOffers: [mockOffersForPrice[0]]
  },
  reviews: {
    reviews: reviews
  },
  authorization: {
    isAuthorizationStatus: AuthorizationStatus.NoAuth,
    dataAuthorization: null,
  },
  favorite: {
    offersList: [],
  }
});


const getURL = (url: string): void => {
  window.history.replaceState(
    {},
    '',
    url
  );
};


const mockRender = (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path={Address.Main}>
          <Route index element={<MainPage/>} />
          <Route path={Address.Login} element={<LoginPage/>}/>
          <Route path={Address.Favorites} element={<PrivateRouteComponent/>}/>
          <Route path={`${Address.Room}:idex`} element={<PropertyPage/>}/>
          <Route path={Address.Error} element={<ErrorComponent/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

describe('Test component "App"', () => {
  test('Correct page "MainPage" rendering', () => {

    render(mockRender);

    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText(/place to stay in/)).toBeInTheDocument();
  });
  test('Correct page "LoginPage" rendering', () => {

    getURL(Address.Login);

    render(mockRender);

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
  });
  test('Correct component "PrivateRouteComponent" rendering', () => {

    getURL(Address.Favorites);

    render(mockRender);

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
  });
  test('Correct component "ErrorComponent" rendering', () => {

    getURL(Address.Error);

    render(mockRender);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  test('Correct page "PropertyPage" rendering', () => {

    getURL(`${Address.Room}3`);

    render(mockRender);

    expect(screen.getByText('Baby seat')).toBeInTheDocument();
    expect(screen.getByText('Angelina')).toBeInTheDocument();
  });
});
