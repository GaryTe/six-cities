import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import PropertyPage from '../../pages/property-page/property-page';
import PrivateRouteComponent from '../private-route-componente.tsx/private-route-component';
import LoginPage from '../../pages/login-page/login-page';
import ErrorComponent from '../error-component/error-component';
import { Address } from '../../const';
import { Offers } from '../../types/Response';

type AppProps = {
  offers: Offers;
}

function App({offers}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Address.Main}>
          <Route index element={<MainPage offers={offers}/>} />
          <Route path={Address.Login} element={<LoginPage/>}/>
          <Route path={Address.Favorites} element={<PrivateRouteComponent/>}/>
          <Route path={`${Address.Room}:id`} element={<PropertyPage/>}/>
          <Route path={Address.Error} element={<ErrorComponent/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
