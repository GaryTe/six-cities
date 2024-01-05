import {useRef, useState} from 'react';
import {
  useNavigate,
  useLocation
} from 'react-router-dom';
import {toast} from 'react-toastify';
import HeaderLoginComponent from '../../components/header-login-component/header-login-component';
import {
  checkEmail,
  checkPassword,
  getRandomNumber
} from '../../util/util';
import {
  requestAuthorizationOnServer,
  requestChangesStatus
} from '../../api/request';
import { resetError } from '../../store/slice-reducer/favorite-slice/favorite-slice';
import { resetErrorAuthorization } from '../../store/slice-reducer/authorization-slice/authorization-slice';
import {
  useAppDispatch,
} from '../../hooks/hooks-store/hooks-store';
import { changeNameCity } from '../../store/slice-reducer/offers-list-slice/offers-list-slice';
import {
  Address,
  CitiesList
} from '../../const';
import { ValueStatus } from '../../types/response';

type Location = {
  state: ValueStatus;
}

type Response = {
error: {
  code: string;
};
};

type ErrorMessage = {
  message: string;
};

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

  const randomNumber = getRandomNumber(0, Object.values(CitiesList).length);
  const randomNameCity = Object.values(CitiesList)[randomNumber];

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
      toast.loading('Sending user data. Wait please.');

      setDataValue({...dataValue, button: true});

      const inputEmail = refEmail.current;
      const inputPassword = refPassword.current;

      dispatch(requestAuthorizationOnServer({
        email: refEmail.current.value,
        password: refPassword.current.value
      }))
        .then((response) => {
          if(response.meta.requestStatus !== 'rejected') {
            return response;
          }

          const {error: {code}} = response as Response;
          throw new Error(code);
        })
        .then(() => {
          toast.dismiss();
          toast.success('Data receved', {autoClose: 6000});

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
        })
        .catch((error) => {
          const {message} = error as ErrorMessage;
          toast.dismiss();
          toast.error(message, {autoClose: 6000});
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
              <a
                className="locations__item-link"
                href="#todo"
                onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(changeNameCity(randomNameCity));
                  navigate(Address.Main);
                }}
              >
                <span>{randomNameCity}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
