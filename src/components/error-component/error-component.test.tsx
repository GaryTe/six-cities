import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import ErrorComponent from './error-component';
import MainPage from '../../pages/main-page/main-page';
import { Address } from '../../const';
//import { offers } from '../../mocks/offers';

jest.mock('../../pages/main-page/main-page', () => function MockMainPage (): JSX.Element {
  return(
    <div>
        MainPage
    </div>
  );
});

const mockRender = (
  <BrowserRouter>
    <Routes>
      <Route path={Address.Main}>
        <Route index element={<MainPage/>} />
        <Route path={Address.Error} element={<ErrorComponent/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
);

describe('Test component "ErrorComponent"', () => {
  test('Correct component "ErrorComponent" rendering', () => {

    window.history.replaceState(
      {},
      '',
      Address.Error
    );

    render(mockRender);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  test('Correct mockPage "MainPage" rendering', () => {

    render(mockRender);

    const linkElement = screen.getByText('Click me');
    expect(linkElement).toBeInTheDocument();

    document.addEventListener('click', () => {
      window.history.replaceState(
        {},
        '',
        Address.Main
      );
    });

    fireEvent(linkElement,
      new Event('click',{
        bubbles: true,
        cancelable: true
      })
    );

    //render(mockRender);

    expect(screen.getByText('MainPage')).toBeInTheDocument();
  });
});
