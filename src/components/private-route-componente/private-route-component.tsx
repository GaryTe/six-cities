import {Navigate, useLocation} from 'react-router-dom';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import {
  Address,
  AuthorizationStatus
} from '../../const';
import { storageAuthorization } from '../../store/slice-reducer/authorization-slice/authorization-slice';
import { useAppSelector } from '../../hooks/hooks-store/hooks-store';
import { ValueStatus } from '../../types/response';

type Location = {
  state: {
    key: null | ValueStatus;
  };
}

export default function PrivateRouteComponent(): JSX.Element {
  const {isAuthorizationStatus} = useAppSelector(storageAuthorization);
  const location: Location = useLocation();

  const {state} = location;

  return(
    isAuthorizationStatus === AuthorizationStatus.Auth ?
      <FavoritesPage/>
      :
      <Navigate to={Address.Login} state={state}/>
  );
}
