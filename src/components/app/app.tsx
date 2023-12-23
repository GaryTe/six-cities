import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoadingMainPageComponent from '../loading-main-page-component/loading-main-page-component';
import LoadingPropertyPageComponent from '../loading-property-page-component/loding-property-page-component';
import PrivateRouteComponent from '../private-route-componente/private-route-component';
import LoginPage from '../../pages/login-page/login-page';
import ErrorComponent from '../error-component/error-component';
import { Address } from '../../const';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Address.Main}>
          <Route index element={<LoadingMainPageComponent/>} />
          <Route path={Address.Login} element={<LoginPage/>}/>
          <Route path={Address.Favorites} element={<PrivateRouteComponent/>}/>
          <Route path={`${Address.Room}:idex`} element={<LoadingPropertyPageComponent/>}/>
          <Route path={Address.Error} element={<ErrorComponent/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
