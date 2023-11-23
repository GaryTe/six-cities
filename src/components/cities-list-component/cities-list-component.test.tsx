import {render, screen} from '@testing-library/react';
import CitiesListComponent from './cities-list-component';

describe('Test component "CitiesListComponent"', () => {
  test('Correct component "CitiesListComponent" rendering', () => {
    render(
      <CitiesListComponent/>
    );

    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
  });
});
