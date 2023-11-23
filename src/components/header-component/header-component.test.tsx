import {render, screen} from '@testing-library/react';
import HeaderComponent from './header-component';

describe('Test component "HeaderComponent"', () => {
  test('Correct component "HeaderComponent" rendering', () => {
    render(
      <HeaderComponent/>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByText('Oliver.conner@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
