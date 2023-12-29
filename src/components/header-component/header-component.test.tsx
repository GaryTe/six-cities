import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import HeaderComponent from './header-component';
import { AuthorizationStatus } from '../../const';

const mockStore = configureMockStore();

const store = mockStore({
  authorization: {
    isAuthorizationStatus: AuthorizationStatus.NoAuth,
    dataAuthorization: null,
  },
  favorite: {
    offersList: []
  }
});

describe('Test component "HeaderComponent"', () => {
  test('Correct component "HeaderComponent" rendering', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HeaderComponent/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.queryByText('Oliver.conner@gmail.com')).not.toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
