import {render, screen} from '@testing-library/react';
import LoginPage from './login-page';

describe('Test page "LoginPage"', () => {
  test('Correct page "LoginPage" rendering', () => {
    render(
      <LoginPage/>
    );

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
