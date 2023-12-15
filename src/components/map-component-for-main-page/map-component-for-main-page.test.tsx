import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import MapComponentForMainPage from './map-component-for-main-page';
import { mockOffersForPrice } from '../../util/mock-util';

describe('Test component "MapComponentForMainPage"', () => {
  test('Correct component "MapComponentForMainPage" rendering', () => {
    render(
      <BrowserRouter>
        <MapComponentForMainPage
          offers={[mockOffersForPrice[0]]}
          idOffer={mockOffersForPrice[0].id}
        />
      </BrowserRouter>
    );

    expect(screen.getByAltText('Marker')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Zoom in'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Zoom out'})).toBeInTheDocument();
    expect(screen.getByText('OpenStreetMap')).toBeInTheDocument();
  });
});
