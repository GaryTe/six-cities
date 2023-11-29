import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import MainPage from '../../pages/main-page/main-page';
import PropertyPage from '../../pages/property-page/property-page';
import PrivateRouteComponent from '../private-route-componente.tsx/private-route-component';
import LoginPage from '../../pages/login-page/login-page';
import ErrorComponent from '../error-component/error-component';
import { Address } from '../../const';
import { offers } from '../../mocks/offers';

const getURL = (url: string): void => {
  window.history.replaceState(
    {},
    '',
    url
  );
};

const mockRender = (
  <BrowserRouter>
    <Routes>
      <Route path={Address.Main}>
        <Route index element={<MainPage offers={offers}/>} />
        <Route path={Address.Login} element={<LoginPage/>}/>
        <Route path={Address.Favorites} element={<PrivateRouteComponent/>}/>
        <Route path={`${Address.Room}:id`} element={<PropertyPage/>}/>
        <Route path={Address.Error} element={<ErrorComponent/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
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
  test('Correct page "PropertyPage" rendering', () => {

    getURL(`${Address.Room}3`);

    render(mockRender);

    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
    expect(screen.getByText('Angelina')).toBeInTheDocument();
  });
  test('Correct component "ErrorComponent" rendering', () => {

    getURL(Address.Error);

    render(mockRender);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Go to home page')).toBeInTheDocument();
  });
});
