import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import FeedbackFormComponent from './feedback-form-component';
import { store } from '../../store/store/store';

describe('Test component "FeedbackFormComponent"', () => {
  test('Correct component "FeedbackFormComponent" rendering', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FeedbackFormComponent index={1}/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
