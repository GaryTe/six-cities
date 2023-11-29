import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import HeaderComponent from './header-component';

describe('Test component "HeaderComponent"', () => {
  test('Correct component "HeaderComponent" rendering', () => {
    render(
      <BrowserRouter>
        <HeaderComponent/>
      </BrowserRouter>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.queryByText('Oliver.conner@gmail.com')).not.toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
