import {createAsyncThunk, } from '@reduxjs/toolkit';
import {AxiosInstance, AxiosError} from 'axios';
import { AdditionToAddress } from '../const';
import {
  Offers,
  Offer,
  ReviewsList,
  DataAuthorization,
  UserData,
  ValueStatus
} from '../types/response';

export const requestToGetOffersList = createAsyncThunk<Offers, undefined, {
  extra: AxiosInstance;
}>(
  'data/requestToGetOffersList',
  async (arg, {extra: api}) => {
    const {data} = await api.get<Offers>(AdditionToAddress.Hotels);
    return data;
  }
);

export const requestToGetOffer = createAsyncThunk<Offer, number, {
  extra: AxiosInstance;
}>(
  'data/requestToGetOffer',
  async (number, {extra: api}) => {
    const {data} = await api.get<Offer>(`${AdditionToAddress.Hotels}/${number}`);
    return data;
  }
);

export const requestToGetReviews = createAsyncThunk<ReviewsList, number, {
  extra: AxiosInstance;
}>(
  'data/requestToGetReviews',
  async (number, {extra: api}) => {
    const {data} = await api.get<ReviewsList>(`${AdditionToAddress.Comments}${number}`);
    return data;
  }
);

export const requestToGetOffersNearby = createAsyncThunk<Offers, number, {
  extra: AxiosInstance;
}>(
  'data/requestToGetOffersNearby',
  async (number, {extra: api}) => {
    const {data} = await api.get<Offers>(`${AdditionToAddress.Hotels}/${number}${AdditionToAddress.Nearby}`);
    return data;
  }
);

export const requestCheckingAuthorizationStatus = createAsyncThunk<DataAuthorization, undefined, {
  extra: AxiosInstance;
}>(
  'data/requestCheckingAuthorizationStatus',
  async (arg, {extra: api, rejectWithValue}) => {
    try{
      const response = await api.get<DataAuthorization>(AdditionToAddress.Login);
      return response.data;
    }catch(err){
      const error = err as AxiosError;

      return rejectWithValue(error.response?.data);
    }
  }
);

export const requestAuthorizationOnServer = createAsyncThunk<DataAuthorization, UserData, {
  extra: AxiosInstance;
}>(
  'data/requestAuthorizationOnServer',
  async ({email, password}, {extra: api}) => {
    const {data} = await api.post<DataAuthorization>(AdditionToAddress.Login, {email, password});
    return data;
  }
);

export const requestEndUserSession = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
}>(
  'data/requestEndUserSession',
  async (arg, {extra: api}) => {
    await api.delete(AdditionToAddress.Logout);
  }
);

export const requestOffersListFavorite = createAsyncThunk<Offers, undefined, {
  extra: AxiosInstance;
}>(
  'data/requestOffersListFavorite',
  async (arg, {extra: api}) => {
    const {data} = await api.get<Offers>(AdditionToAddress.Favorite);
    return data;
  }
);

export const requestChangesStatus = createAsyncThunk<Offer, ValueStatus, {
  extra: AxiosInstance;
}>(
  'data/requestChangesStatus',
  async ({hotelId, status}, {extra: api}) => {
    const {data} = await api.post<Offer>(`${AdditionToAddress.Favorite}/${hotelId}/${Number(status)}`);
    return data;
  }
);
