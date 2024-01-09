import {useLocation, Link} from 'react-router-dom';
import { Address } from '../../const';

type Location = {
  state: string;
}

export default function HeaderLoginComponent(): JSX.Element {
  const {state} = useLocation() as Location;

  return(
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className="header__logo-link"
              to={state}
              state={Address.Main}
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
