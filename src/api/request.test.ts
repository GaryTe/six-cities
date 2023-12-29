import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store/store/store';
import { creatAxios } from './configuration-axios';
import {
  requestToGetOffersList,
  requestToGetOffer,
  requestToGetReviews,
  requestToGetOffersNearby,
  requestCheckingAuthorizationStatus,
  requestAuthorizationOnServer,
  requestEndUserSession,
  requestOffersListFavorite,
  requestChangesStatus,
  requestForReview
} from './request';
import { AdditionToAddress } from '../const';
import { offers } from '../mocks/offers';
import { reviews } from '../mocks/reviews';
import {
  Offers,
  Offer,
  ReviewsList,
  DataAuthorization
} from '../types/response';


const api = creatAxios();
const mockApi = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

type Action = {
  type: string;
  payload: undefined;
}

const mockStore = configureMockStore<
      RootState,
      Action,
      ThunkDispatch<RootState, typeof api, Action>
    >(middlewares);

const store = mockStore();

describe('Test function request to server', () => {
  afterEach(() => {
    mockApi.reset();
    store.clearActions();
  });
  test('Positive test function "requestToGetOffersList"', async () => {

    mockApi
      .onGet(AdditionToAddress.Hotels)
      .reply(200, offers);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requestToGetOffersList());

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        'data/requestToGetOffersList/pending',
        'data/requestToGetOffersList/fulfilled'
      ]);

    const {data} = await api.get<Offers>(AdditionToAddress.Hotels);

    expect(data).toEqual(offers);
  });
  test('Negative test function "requestToGetOffersList"', async () => {

    mockApi
      .onGet(AdditionToAddress.Hotels)
      .reply(404);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requestToGetOffersList());

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        'data/requestToGetOffersList/pending',
        'data/requestToGetOffersList/rejected'
      ]);
  });
  test('Positive test function "requestToGetOffer"', async () => {

    mockApi
      .onGet(`${AdditionToAddress.Hotels}/${1}`)
      .reply(200, offers[0]);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requestToGetOffer(1));

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        'data/requestToGetOffer/pending',
        'data/requestToGetOffer/fulfilled'
      ]);

    const {data} = await api.get<Offer>(`${AdditionToAddress.Hotels}/${1}`);

    expect(data).toEqual(offers[0]);
  });
  test('Negative test function "requestToGetOffer"', async () => {

    mockApi
      .onGet(`${AdditionToAddress.Hotels}/${1}`)
      .reply(404);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requestToGetOffer(1));

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        'data/requestToGetOffer/pending',
        'data/requestToGetOffer/rejected'
      ]);
  });
  test('Positive test function "requestToGetReviews"', async () => {

    mockApi
      .onGet(`${AdditionToAddress.Comments}${1}`)
      .reply(200, reviews);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requestToGetReviews(1));

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        'data/requestToGetReviews/pending',
        'data/requestToGetReviews/fulfilled'
      ]);

    const {data} = await api.get<ReviewsList>(`${AdditionToAddress.Comments}${1}`);

    expect(data).toEqual(reviews);
  });
  test('Negative test function "requestToGetReviews"', async () => {

    mockApi
      .onGet(`${AdditionToAddress.Comments}/${1}`)
      .reply(404);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requestToGetReviews(1));

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        'data/requestToGetReviews/pending',
        'data/requestToGetReviews/rejected'
      ]);
  });
  test('Positive test function "requestToGetOffersNearby"', async () => {

    mockApi
      .onGet(`${AdditionToAddress.Hotels}/${1}${AdditionToAddress.Nearby}`)
      .reply(200, [offers[0]]);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requestToGetOffersNearby(1));

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        'data/requestToGetOffersNearby/pending',
        'data/requestToGetOffersNearby/fulfilled'
      ]);

    const {data} = await api.get<Offers>(`${AdditionToAddress.Hotels}/${1}${AdditionToAddress.Nearby}`);

    expect(data).toEqual([offers[0]]);
  });
  test('Negative test function "requestToGetOffersNearby"', async () => {

    mockApi
      .onGet(`${AdditionToAddress.Hotels}/${1}${AdditionToAddress.Nearby}`)
      .reply(404);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requestToGetOffersNearby(1));

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        'data/requestToGetOffersNearby/pending',
        'data/requestToGetOffersNearby/rejected'
      ]);
  });
  test('Positive test function "requestCheckingAuthorizationStatus"', async () => {

    mockApi
      .onGet(AdditionToAddress.Login)
      .reply(200, {
        avatarUrl: 'img/1.png',
        email: 'Oliver.conner@gmail.com',
        id: 1,
        isPro: false,
        name: 'Oliver.conner',
        token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
      });

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requestCheckingAuthorizationStatus());

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        'data/requestCheckingAuthorizationStatus/pending',
        'data/requestCheckingAuthorizationStatus/fulfilled'
      ]);

    const {data} = await api.get<DataAuthorization>(AdditionToAddress.Login);

    expect(data).toEqual({
      avatarUrl: 'img/1.png',
      email: 'Oliver.conner@gmail.com',
      id: 1,
      isPro: false,
      name: 'Oliver.conner',
      token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
    });
  });
  test('Negative test function "requestCheckingAuthorizationStatus"', async () => {

    mockApi
      .onGet(AdditionToAddress.Login)
      .reply(401, {error: 'You are not logged in or you do not have permission to this page.'
      });

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requestCheckingAuthorizationStatus());

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        'data/requestCheckingAuthorizationStatus/pending',
        'data/requestCheckingAuthorizationStatus/rejected'
      ]);

    const {payload} = store.getActions()[1];
    expect(payload).toEqual(
      {
        error: 'You are not logged in or you do not have permission to this page.'
      }
    );
  });
  test('Positive test function "requestAuthorizationOnServer"', async () => {

    mockApi
      .onPost(AdditionToAddress.Login)
      .reply(200, {
        avatarUrl: 'img/1.png',
        email: 'Oliver.conner@gmail.com',
        id: 1,
        isPro: false,
        name: 'Oliver.conner',
        token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
      });

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requestAuthorizationOnServer(
      {
        email: 'Oliver.conner@gmail.com',
        password: '12345678'
      }
    ));

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        'data/requestAuthorizationOnServer/pending',
        'data/requestAuthorizationOnServer/fulfilled'
      ]);

    const {data} = await api.post<DataAuthorization>(AdditionToAddress.Login);

    expect(data).toEqual(
      {
        avatarUrl: 'img/1.png',
        email: 'Oliver.conner@gmail.com',
        id: 1,
        isPro: false,
        name: 'Oliver.conner',
        token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
      }
    );
  });
  test('Negative test function "requestAuthorizationOnServer"', async () => {

    mockApi
      .onPost(AdditionToAddress.Login)
      .reply(400);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requestAuthorizationOnServer(
      {
        email: 'Oliver.conner@gmail.com',
        password: '12345678'
      }
    ));

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        'data/requestAuthorizationOnServer/pending',
        'data/requestAuthorizationOnServer/rejected'
      ]);
  });
  test('Positive test function "requestEndUserSession"', async () => {

    mockApi
      .onDelete(AdditionToAddress.Logout)
      .reply(200);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requestEndUserSession());

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        'data/requestEndUserSession/pending',
        'data/requestEndUserSession/fulfilled'
      ]);
  });
  test('Negative test function "requestEndUserSession"', async () => {

    mockApi
      .onDelete(AdditionToAddress.Logout)
      .reply(400);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requestEndUserSession());

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        'data/requestEndUserSession/pending',
        'data/requestEndUserSession/rejected'
      ]);
  });
  test('Positive test function "requestOffersListFavorite"', async () => {

    mockApi
      .onGet(AdditionToAddress.Favorite)
      .reply(200, offers);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requestOffersListFavorite());

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        'data/requestOffersListFavorite/pending',
        'data/requestOffersListFavorite/fulfilled'
      ]);

    const {data} = await api.get<Offers>(AdditionToAddress.Favorite);
    expect(data).toEqual(offers);
  });
  test('Negative test function "requestOffersListFavorite"', async () => {

    mockApi
      .onGet(AdditionToAddress.Favorite)
      .reply(401);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requestOffersListFavorite());

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        'data/requestOffersListFavorite/pending',
        'data/requestOffersListFavorite/rejected'
      ]);
  });
  test('Positive test function "requestChangesStatus"', async () => {

    mockApi
      .onPost(`${AdditionToAddress.Favorite}/${1}/${1}`)
      .reply(200, offers[0]);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requestChangesStatus(
      {
        hotelId: 1,
        status: true
      }
    ));

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        'data/requestChangesStatus/pending',
        'data/requestChangesStatus/fulfilled'
      ]);

    const {data} = await api.post<Offer>(`${AdditionToAddress.Favorite}/${1}/${1}`);
    expect(data).toEqual(offers[0]);
  });
  test('Negative test function "requestChangesStatus"', async () => {

    mockApi
      .onPost(`${AdditionToAddress.Favorite}/${1}/${1}`)
      .reply(401);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requestChangesStatus(
      {
        hotelId: 1,
        status: true
      }
    ));

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        'data/requestChangesStatus/pending',
        'data/requestChangesStatus/rejected'
      ]);
  });
  test('Positive test function "requestForReview"', async () => {

    mockApi
      .onPost(`${AdditionToAddress.Comments}${1}`)
      .reply(200, [reviews[0]]);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requestForReview(
      {
        index: 1,
        comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
        rating: 4
      }
    ));

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        'data/requestForReview/pending',
        'data/requestForReview/fulfilled'
      ]);

    const {data} = await api.post<ReviewsList>(`${AdditionToAddress.Comments}${1}`);
    expect(data).toEqual([reviews[0]]);
  });
  test('Negative test function "requestForReview"', async () => {

    mockApi
      .onPost(`${AdditionToAddress.Comments}${1}`)
      .reply(400);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(requestForReview(
      {
        index: 1,
        comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
        rating: 4
      }
    ));

    const actions = store.getActions().map(({type}) => type);
    expect(actions)
      .toEqual([
        'data/requestForReview/pending',
        'data/requestForReview/rejected'
      ]);
  });
});
