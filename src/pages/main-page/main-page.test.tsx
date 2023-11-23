import {render, screen} from '@testing-library/react';
import MainPage from './main-page';

describe('Test page "MainPage"', () => {
  test('Correct page "MainPage" rendering', () => {
    render(
      <MainPage/>
    );

    expect(screen.getByText('Places')).toBeInTheDocument();
    expect(screen.getByText(/312 places/i)).toBeInTheDocument();
    expect(screen.getByText(/luxurious/i)).toBeInTheDocument();
  });
});
