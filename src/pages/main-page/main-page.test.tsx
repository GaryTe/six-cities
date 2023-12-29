import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import MainPage from './main-page';
import { mockOffersForPrice } from '../../util/mock-util';
import { CitiesList } from '../../const';

jest.mock('../../components/header-component/header-component', () => function MockHeaderComponent(): JSX.Element {
  return (
    <div>
      HeaderComponent
    </div>
  );
});

jest.mock('../../components/card-place-component/card-place-component', () => function MockCardPlaceComponent(): JSX.Element {
  return (
    <div>
      CardPlaceComponent
    </div>
  );
});

const mockStore = configureMockStore();

describe('Test page "MainPage"', () => {
  test('Correct page "MainPage" rendering', () => {
    render(
      <Provider store={mockStore({
        offers: {
          loading: false,
          cityName: CitiesList.Paris,
          offers: mockOffersForPrice,
          changeOffers: [mockOffersForPrice[0]],
          typeError: null
        }
      })}
      >
        <BrowserRouter>
          <MainPage/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Places')).toBeInTheDocument();
    expect(screen.getByText(/1 place/i)).toBeInTheDocument();
    expect(screen.getByText('CardPlaceComponent')).toBeInTheDocument();
  });
});
