import {createSlice} from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { StorageAuthorization } from '../../../types/state';
import {
  requestCheckingAuthorizationStatus,
  requestAuthorizationOnServer,
  requestEndUserSession
} from '../../../api/request';
import { NameReducer, AuthorizationStatus } from '../../../const';
import { Error } from '../../../types/response';
import {
  saveToken,
  dropToken
} from '../../../api/token';

const initialState: StorageAuthorization = {
  isAuthorizationStatus: AuthorizationStatus.Unknown,
  dataAuthorization: null,
  typeErrorAuthorization: null
};

export const authorizationSlice = createSlice({
  name: NameReducer.Authorization,
  initialState,
  reducers: {
    resetErrorAuthorization: (state) => {state.typeErrorAuthorization = null;}
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestCheckingAuthorizationStatus.fulfilled, (state, action) => {
        state.dataAuthorization = action.payload;
        state.isAuthorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(requestCheckingAuthorizationStatus.rejected, (state, action) => {
        state.typeErrorAuthorization = action.payload as Error;
        state.isAuthorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(requestAuthorizationOnServer.fulfilled, (state, action) => {
        state.dataAuthorization = action.payload;
        state.isAuthorizationStatus = AuthorizationStatus.Auth;
        saveToken(action.payload.token);
      })
      .addCase(requestAuthorizationOnServer.rejected, (state, action) => {
        state.typeErrorAuthorization = action.error;
        state.isAuthorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(requestEndUserSession.fulfilled, (state) => {
        state.isAuthorizationStatus = AuthorizationStatus.NoAuth;
        state.dataAuthorization = null;
        dropToken();
      })
      .addCase(requestEndUserSession.rejected, (state, action) => {
        state.typeErrorAuthorization = action.error;
      });
  }
});

export const storageAuthorization = (state: RootState) => state.authorization;
export const {resetErrorAuthorization} = authorizationSlice.actions;
