import {
  authorizationSlice,
  resetErrorAuthorization
} from './authorization-slice';
import { AuthorizationStatus } from '../../../const';
import {
  requestCheckingAuthorizationStatus,
  requestAuthorizationOnServer,
  requestEndUserSession
} from '../../../api/request';

describe('Test slice "authorizationSlice"', () => {
  test('Reset error.', () => {

    const state = {
      isAuthorizationStatus: AuthorizationStatus.Unknown,
      dataAuthorization: null,
      typeErrorAuthorization: { error: 'You are not logged in or you do not have permission to this page.'}
    };

    expect(authorizationSlice.reducer(state, resetErrorAuthorization()))
      .toEqual({
        isAuthorizationStatus: AuthorizationStatus.Unknown,
        dataAuthorization: null,
        typeErrorAuthorization: null
      });
  });
  test('Positive check authorization user', () => {
    const state = authorizationSlice.getInitialState();

    expect(authorizationSlice.reducer(state,
      {
        type: requestCheckingAuthorizationStatus.fulfilled.type,
        payload: {
          isAuthorizationStatus: AuthorizationStatus.Auth,
          dataAuthorization: {
            avatarUrl: 'img/1.png',
            email: 'Oliver.conner@gmail.com',
            id: 1,
            isPro: false,
            name: 'Oliver.conner',
            token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
          }
        }
      }
    )).toEqual({
      isAuthorizationStatus: AuthorizationStatus.Auth,
      dataAuthorization: {
        isAuthorizationStatus: AuthorizationStatus.Auth,
        dataAuthorization: {
          avatarUrl: 'img/1.png',
          email: 'Oliver.conner@gmail.com',
          id: 1,
          isPro: false,
          name: 'Oliver.conner',
          token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
        }
      },
      typeErrorAuthorization: null
    });
  });
  test('Negative check authorization user', () => {
    const state = authorizationSlice.getInitialState();

    expect(authorizationSlice.reducer(
      state,
      {
        type: requestCheckingAuthorizationStatus.rejected.type,
        payload: {
          error: 'You are not logged in or you do not have permission to this page.'
        }
      }
    )).toEqual({
      isAuthorizationStatus: AuthorizationStatus.NoAuth,
      dataAuthorization: null,
      typeErrorAuthorization: { error: 'You are not logged in or you do not have permission to this page.'}
    });
  });
  test('Positive request for authorization user', () => {
    const state = authorizationSlice.getInitialState();

    expect(authorizationSlice.reducer(
      state,
      {
        type: requestAuthorizationOnServer.fulfilled.type,
        payload: {
          avatarUrl: 'img/1.png',
          email: 'Oliver.conner@gmail.com',
          id: 1,
          isPro: false,
          name: 'Oliver.conner',
          token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
        }
      }
    )).toEqual({
      isAuthorizationStatus: AuthorizationStatus.Auth,
      dataAuthorization: {
        avatarUrl: 'img/1.png',
        email: 'Oliver.conner@gmail.com',
        id: 1,
        isPro: false,
        name: 'Oliver.conner',
        token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
      },
      typeErrorAuthorization: null
    });
  });
  test('Negative request for authorization user', () => {
    const state = authorizationSlice.getInitialState();

    expect(authorizationSlice.reducer(
      state,
      {
        type: requestAuthorizationOnServer.rejected.type,
        error: {}
      }
    )).toEqual({
      isAuthorizationStatus: AuthorizationStatus.NoAuth,
      dataAuthorization: null,
      typeErrorAuthorization: {}
    });
  });
  test('Positive request for end user session', () => {
    const state = {
      isAuthorizationStatus: AuthorizationStatus.Auth,
      dataAuthorization: {
        avatarUrl: 'img/1.png',
        email: 'Oliver.conner@gmail.com',
        id: 1,
        isPro: false,
        name: 'Oliver.conner',
        token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
      },
      typeErrorAuthorization: null
    };

    expect(authorizationSlice.reducer(
      state,
      {
        type: requestEndUserSession.fulfilled.type
      }
    )).toEqual({
      isAuthorizationStatus: AuthorizationStatus.NoAuth,
      dataAuthorization: null,
      typeErrorAuthorization: null
    });
  });
  test('Negative request for end user session', () => {
    const state = authorizationSlice.getInitialState();

    expect(authorizationSlice.reducer(
      state,
      {
        type: requestEndUserSession.rejected.type,
        error: {}
      }
    )).toEqual({
      isAuthorizationStatus: AuthorizationStatus.Unknown,
      dataAuthorization: null,
      typeErrorAuthorization: {}
    });
  });
});
