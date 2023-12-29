import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import SortOffersListComponent from './sort-offers-list-component';
import { Offers } from '../../types/response';
import {
  CitiesList,
  NameSortList,
  AuthorizationStatus
} from '../../const';
import { offers } from '../../mocks/offers';

const mockStore = configureMockStore();

type IndicatorOffer = {
  valueCitie: string;
  valueSort: string;
  dataOffers: Offers;
}

function MockMainPage(): JSX.Element {

  const [indicatorOffer, setIndicatorOffer] = useState<IndicatorOffer>({
    valueCitie: CitiesList.Paris,
    valueSort: NameSortList.Popular,
    dataOffers: offers
  });

  return (
    <div>
      <SortOffersListComponent state={{
        indicatorOffer,
        onSetIndicatorOffer: setIndicatorOffer
      }}
      />
    </div>
  );
}

describe('Test component "OffersListComponent"', () => {
  test('Correct component "OffersListComponent" rendering', () => {
    const store = mockStore({
      authorization: {isAuthorizationStatus: AuthorizationStatus.NoAuth}
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <MockMainPage/>
        </BrowserRouter>
      </Provider>
    );

    const spanElement = screen.getByTestId('spanElement');
    expect(spanElement).toBeInTheDocument();

    fireEvent(spanElement,
      new MouseEvent('click', {
        bubbles: true
      }
      ));

    const itemsOfferList = screen.getAllByRole('listitem');
    itemsOfferList.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });
});
