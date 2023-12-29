import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import LoginPage from './login-page';

const mockStore = configureMockStore();

describe('Test page "LoginPage"', () => {
  test('Correct page "LoginPage" rendering', () => {
    render(
      <Provider store={mockStore()}>
        <BrowserRouter>
          <LoginPage/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
