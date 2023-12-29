import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {screen, render} from '@testing-library/react';
import LoadingMainPageComponent from './loading-main-page-component';

const mockStore = configureMockStore();

describe('Test component "LoadingMainPageComponent"', () => {
  test('In status loading', () => {
    const store = mockStore({
      offers: {
        loading: true
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoadingMainPageComponent/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('...Loading data. Wait please.')).toBeInTheDocument();
  });
});
