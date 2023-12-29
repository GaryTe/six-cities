import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import LoadingPropertyPageComponent from './loding-property-page-component';

const mockStore = configureMockStore();

describe('Test component "LoadingPropertyPageComponent"', () => {
  test('In status loading', () => {
    const store = mockStore(
      {
        offer: {loading: true}
      }
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoadingPropertyPageComponent/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('...Loading data. Wait please.')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Click me for go back to main page.'})).toBeInTheDocument();
  });
});
