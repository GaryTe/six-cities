import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import MainPage from './main-page';
import { mockOffersForPrice } from '../../util/mock-util';

describe('Test page "MainPage"', () => {
  test('Correct page "MainPage" rendering', () => {
    render(
      <BrowserRouter>
        <MainPage offers={mockOffersForPrice}/>
      </BrowserRouter>
    );

    expect(screen.getByText('Places')).toBeInTheDocument();
    expect(screen.getByText(/1 place/i)).toBeInTheDocument();
    expect(screen.getByText('The Pondhouse - A Magical Place')).toBeInTheDocument();
  });
});
