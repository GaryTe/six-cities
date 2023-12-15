import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import MapComponentForPropertyPage from './map-component-for-property-page';
import { mockOffersForPrice } from '../../util/mock-util';

describe('Test component "MapComponentForPropertyPage"', () => {
  test('Correct component "MapComponentForPropertyPage" rendering', () => {
    render(
      <BrowserRouter>
        <MapComponentForPropertyPage
          offers={[mockOffersForPrice[0]]}
          offer={mockOffersForPrice[0]}
        />
      </BrowserRouter>
    );

    expect(screen.getByAltText('Marker')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Zoom in'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Zoom out'})).toBeInTheDocument();
    expect(screen.getByText('OpenStreetMap')).toBeInTheDocument();
  });
});
