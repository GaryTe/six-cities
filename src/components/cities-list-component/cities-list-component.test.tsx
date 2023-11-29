import {useState} from 'react';
import {render, screen} from '@testing-library/react';
import CitiesListComponent from './cities-list-component';
import { Offers } from '../../types/Response';
import { offers } from '../../mocks/offers';
import {
  CitiesList,
  NameSortList
} from '../../const';

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
    <div data-testid="mockMainPage">
      <CitiesListComponent state={{
        offers,
        indicatorOffer,
        onSetIndicatorOffer: setIndicatorOffer
      }}
      />
    </div>
  );
}

describe('Test component "CitiesListComponent"', () => {
  test('Correct component "CitiesListComponent" rendering', () => {
    render(
      <MockMainPage />
    );

    expect(screen.getByTestId('mockMainPage')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
  });
});
