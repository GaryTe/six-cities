import {Link} from 'react-router-dom';
import {
  Address,
  isAuthorizationStatus,
  UserStatus
} from '../../const';

export default function HeaderComponent(): JSX.Element {
  const {SignIn, SingOut} = UserStatus;
  return(
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active" href="#todo">
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
              {isAuthorizationStatus &&
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={Address.Favorites}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">
                  Oliver.conner@gmail.com
                  </span>
                  <span className="header__favorite-count">3</span>
                </Link>
              </li>}
              <li className="header__nav-item">
                {isAuthorizationStatus ?
                  <span className="header__signout">{SingOut}</span>
                  :
                  <Link className="header__nav-link" to={Address.Login}>
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
