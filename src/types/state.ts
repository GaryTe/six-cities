import {SerializedError} from '@reduxjs/toolkit';
import {
  Offers,
  ReviewsList,
  Offer,
  DataAuthorization,
  Error } from './response';

export type StorageOffers = {
  loading: boolean;
  cityName: string;
  offers: Offers;
  changeOffers: Offers;
  typeError: null | SerializedError;
};

export type StorageReviews = {
  loading: boolean;
  reviews: ReviewsList;
  typeError: null | SerializedError;
};

export type StorageOffer = {
  loading: boolean;
  offer: null | Offer;
  typeError: null | SerializedError;
};

export type StorageOffersListNearby = {
  loading: boolean;
  offersListNearby: Offers;
  typeError: null | SerializedError;
};

export type StorageAuthorization = {
  isAuthorizationStatus: string;
  dataAuthorization: null | DataAuthorization ;
  typeErrorAuthorization: null | Error | SerializedError;
};

export type StorageOffersListFavorite = {
  loading: boolean;
  offersList: Offers;
  typeError: null | SerializedError;
};
