import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import HeaderLoginComponent from './header-login-component';

describe('Test component "HeaderLoginComponent"', () => {
  test('Correct component "HeaderLoginComponent" rendering', () => {
    render(
      <BrowserRouter>
        <HeaderLoginComponent/>
      </BrowserRouter>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });
});
