import {BrowserRouter} from 'react-router-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import CardPlaceComponent from './card-place-component';
import App from '../app/app';
import { offers } from '../../mocks/offers';
import { Address } from '../../const';

describe('Test component "CardPlaceComponent"', () => {
  test('Correct component "CardPlaceComponent" rendering', () => {
    render(
      <BrowserRouter>
        <CardPlaceComponent offers={offers}/>
      </BrowserRouter>
    );

    const itemsRatingList = screen.getAllByText('Rating');
    itemsRatingList.forEach((item) => {
      expect(item).toBeInTheDocument();
    });

    const itemsPremiumList = screen.getAllByText('Premium');
    itemsPremiumList.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });
  test(`Correct page "LoginPage" rendering if
  click button in the component "CardPlaceComponent"`, () => {
    render(
      <BrowserRouter>
        <CardPlaceComponent offers={offers}/>
      </BrowserRouter>
    );

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });

    document.addEventListener('click', () => window.history.replaceState(
      {},
      '',
      Address.Favorites
    ));

    fireEvent(buttons[2],
      new Event('click',{
        bubbles: true,
        cancelable: true
      })
    );

    render(
      <App offers={offers}/>
    );

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
  });
});
