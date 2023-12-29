import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import LoadingCardPlaceComponent from './loading-card-place-component';

const mockStore = configureMockStore();

const classForElement = {
  classForDivElement: {
    firstClass: 'near-places__list places__list',
    secondClass: 'near-places__image-wrapper place-card__image-wrapper'
  },
  firstClassForAticleElement: 'near-places__card place-card',
  valueForSlice: 3
};

describe('Test component "LoadingCardPlaceComponent"', () => {
  test('In status loading', () => {

    const store = mockStore({
      nearby: {
        loading: true,
        offersListNearby: [],
        typeError: null
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoadingCardPlaceComponent classForElement={classForElement}/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('...Loading offers nearby. Wait please.')).toBeInTheDocument();
  });
  test('In status error', () => {

    const store = mockStore({
      nearby: {
        loading: false,
        offersListNearby: [],
        typeError: {code: 'Bad Request.'}
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoadingCardPlaceComponent classForElement={classForElement}/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Bad Request./)).toBeInTheDocument();
  });
});
