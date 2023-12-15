import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import FeedbackFormComponent from './feedback-form-component';

describe('Test component "FeedbackFormComponent"', () => {
  test('Correct component "FeedbackFormComponent" rendering', () => {
    render(
      <BrowserRouter>
        <FeedbackFormComponent/>
      </BrowserRouter>
    );

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
