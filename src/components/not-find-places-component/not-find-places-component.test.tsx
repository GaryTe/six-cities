import {render, screen} from '@testing-library/react';
import NotFindPlacesComponent from './not-find-places-component';

describe('Test component "NotFindPlacesComponent"', () => {
  test('Correct component "NotFindPlacesComponent" renderin', () => {

    render(<NotFindPlacesComponent nameCity={'Dusseldorf'} />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(/Dusseldorf/)).toBeInTheDocument();
  });
});
