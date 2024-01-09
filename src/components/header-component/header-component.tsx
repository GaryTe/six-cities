import {
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom';
import {
  Address,
  AuthorizationStatus,
  UserStatus
} from '../../const';
import {
  useAppSelector,
  useAppDispatch
} from '../../hooks/hooks-store/hooks-store';
import { storageAuthorization } from '../../store/slice-reducer/authorization-slice/authorization-slice';
import { storageOffersListFavorite } from '../../store/slice-reducer/favorite-slice/favorite-slice';
import { requestEndUserSession } from '../../api/request';

type Location = {
  pathname: string;
  state: string;
}

export default function HeaderComponent(): JSX.Element {
  const {isAuthorizationStatus, dataAuthorization} = useAppSelector(storageAuthorization);
  const {offersList} = useAppSelector(storageOffersListFavorite);

  const {pathname, state} = useLocation() as Location;
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {SignIn, SingOut} = UserStatus;

  return(
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a
              className="header__logo-link header__logo-link--active"
              href={pathname}
              onClick={(evt) => {
                evt.preventDefault();
                if(pathname !== Address.Main) {navigate(state, {state: Address.Main});}
              }}
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuthorizationStatus === AuthorizationStatus.Auth &&
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={Address.Favorites}
                  state={pathname}
                >
                  <div
                    className="header__avatar-wrapper user__avatar-wrapper"
                    style={{backgroundImage: `url(${dataAuthorization?.avatarUrl ?? '../img/avatar.svg'})`}}
                  >
                  </div>
                  <span
                    className="header__user-name user__name"
                  >
                    {dataAuthorization?.email}
                  </span>
                  <span className="header__favorite-count">{offersList.length}</span>
                </Link>
              </li>}
              <li className="header__nav-item">
                {isAuthorizationStatus === AuthorizationStatus.Auth ?
                  <a
                    className="header__nav-link"
                    href="#todo"
                    onClick={(evt) => {
                      evt.preventDefault();
                      dispatch(requestEndUserSession());
                    }}
                  >
                    <span className="header__signout">{SingOut}</span>
                  </a>
                  :
                  <Link className="header__nav-link" to={Address.Login} state={pathname}>
                    <span className="header__login">{SignIn}</span>
                  </Link>}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
