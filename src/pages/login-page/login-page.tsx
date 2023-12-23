import {useRef, useState} from 'react';
import {
  useNavigate,
  useLocation
} from 'react-router-dom';
import HeaderLoginComponent from '../../components/header-login-component/header-login-component';
import {
  checkEmail,
  checkPassword
} from '../../util/util';
import {
  requestAuthorizationOnServer,
  requestChangesStatus
} from '../../api/request';
import { resetError } from '../../store/slice-reducer/favorite-slice/favorite-slice';
import { resetErrorAuthorization } from '../../store/slice-reducer/authorization-slice/authorization-slice';
import { useAppDispatch } from '../../hooks/hooks-store/hooks-store';
import { Address } from '../../const';
import { ValueStatus } from '../../types/response';

type Location = {
  state: ValueStatus;
}

export default function LoginPage(): JSX.Element {

  const refEmail = useRef<null | HTMLInputElement>(null);
  const refPassword = useRef<null | HTMLInputElement>(null);
  const [dataValue, setDataValue] = useState({
    email: false,
    password: false,
    button: false
  });

  const location: Location = useLocation();
  const {state} = location;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const path = typeof state === 'string' ? state : Address.Favorites;

  const submitUserData = () => {
    if(refEmail.current && refPassword.current) {
      const valueEmail = checkEmail(refEmail.current.value);
      const valuePassword = checkPassword(refPassword.current.value);

      setDataValue({
        ...dataValue,
        email: valueEmail,
        password: valuePassword
      });
    }

    if(dataValue.email && dataValue.password && refEmail.current && refPassword.current) {
      setDataValue({...dataValue, button: true});

      const inputEmail = refEmail.current;
      const inputPassword = refPassword.current;

      dispatch(requestAuthorizationOnServer({
        email: refEmail.current.value,
        password: refPassword.current.value
      })).then(() => {
        inputEmail.value = '';
        inputPassword.value = '';

        setDataValue({
          email: false,
          password: false,
          button: false
        });

        if(state && typeof state === 'object') {
          dispatch(requestChangesStatus(state));
        }

        dispatch(resetError());
        dispatch(resetErrorAuthorization());
        navigate(path);
      }).catch(() => {

        setDataValue({
          email: false,
          password: false,
          button: false
        });

      });
    }
  };

  return(
    <div className="page page--gray page--login">
      <HeaderLoginComponent/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={(evt) => {
                evt.preventDefault();
                submitUserData();
              }}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  data-testid="email"
                  defaultValue={'Введите корректный email.'}
                  ref={refEmail}
                  disabled={dataValue.email}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  name="password"
                  placeholder="Password"
                  required
                  data-testid="password"
                  defaultValue={'password, мин. из одной буквы и цифры.'}
                  ref={refPassword}
                  disabled={dataValue.password}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={dataValue.button}
              >
            Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#todo">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
