import {render, screen} from '@testing-library/react';
import FooterComponent from './footer-component';

describe('Test component "FooterComponent"', () => {
  test('Correct component "FooterComponent" rendering', () => {
    render(
      <FooterComponent/>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });
});
