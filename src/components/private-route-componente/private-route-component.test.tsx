import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import PrivateRouteComponent from './private-route-component';
import LoginPage from '../../pages/login-page/login-page';
import {
  Address,
  AuthorizationStatus
} from '../../const';

const mockStore = configureMockStore();

describe('Test component "PrivateRouteComponent"', () => {
  test(`Correct page "LoginPage" rendering if
  value "isAuthorizationStatus" equals "NO_AUTH"`, () => {

    const store = mockStore({
      authorization: {isAuthorizationStatus: AuthorizationStatus.NoAuth}
    });

    window.history.replaceState(
      {},
      '',
      Address.Favorites
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={Address.Login} element={<LoginPage/>}/>
            <Route path={Address.Favorites} element={<PrivateRouteComponent/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
  });
});
