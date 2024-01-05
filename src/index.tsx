import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/app/app';
import { store } from './store/store/store';
import {
  requestToGetOffersList,
  requestCheckingAuthorizationStatus,
  requestOffersListFavorite
} from './api/request';

store.dispatch(requestToGetOffersList());
store.dispatch(requestOffersListFavorite());
store.dispatch(requestCheckingAuthorizationStatus());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        position={'top-right'}
      />
      <App/>
    </Provider>
  </React.StrictMode>,
);
