import {Navigate} from 'react-router-dom';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import {
  Address,
  isAuthorizationStatus
} from '../../const';

export default function PrivateRouteComponent(): JSX.Element {

  return(
    isAuthorizationStatus ?
      <FavoritesPage/>
      :
      <Navigate to={Address.Login}/>
  );
}
