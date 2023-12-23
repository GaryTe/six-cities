import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
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
      <App/>
    </Provider>
  </React.StrictMode>,
);
