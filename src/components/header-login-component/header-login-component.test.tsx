import {render, screen} from '@testing-library/react';
import HeaderLoginComponent from './header-login-component';

describe('Test component "HeaderLoginComponent"', () => {
  test('Correct component "HeaderLoginComponent" rendering', () => {
    render(
      <HeaderLoginComponent/>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });
});
