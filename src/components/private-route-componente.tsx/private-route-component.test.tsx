import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import PrivateRouteComponent from './private-route-component';
import LoginPage from '../../pages/login-page/login-page';
import { Address } from '../../const';

describe('Test component "PrivateRouteComponent"', () => {
  test(`Correct page "LoginPage" rendering if
  value const "isAuthorizationStatus" equals false`, () => {

    window.history.replaceState(
      {},
      '',
      Address.Favorites
    );

    render(
      <BrowserRouter>
        <Routes>
          <Route path={Address.Login} element={<LoginPage/>}/>
          <Route path={Address.Favorites} element={<PrivateRouteComponent/>}/>
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
  });
});
