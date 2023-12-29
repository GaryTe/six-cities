import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import CardPlaceComponent from './card-place-component';
import App from '../app/app';
import { offers } from '../../mocks/offers';
import {
  Address,
  AuthorizationStatus
} from '../../const';

const mockStore = configureMockStore();

const store = mockStore({
  authorization: {
    isAuthorizationStatus: AuthorizationStatus.NoAuth
  }
});

const classForElement = {
  classForDivElement: {
    firstClass: 'cities__places-list places__list tabs__content',
    secondClass: 'cities__image-wrapper place-card__image-wrapper'
  },
  firstClassForAticleElement: 'cities__card place-card',
  valueForSlice: offers.length
};

describe('Test component "CardPlaceComponent"', () => {
  test('Correct component "CardPlaceComponent" rendering', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CardPlaceComponent offers={offers} classForElement={classForElement}/>
        </BrowserRouter>
      </Provider>
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
      <Provider store={store}>
        <BrowserRouter>
          <CardPlaceComponent offers={offers} classForElement={classForElement}/>
        </BrowserRouter>
      </Provider>
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
      <Provider store={store}>
        <App/>
      </Provider>
    );

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
  });
});
