import { Offers, ReviewsList } from './Response';

export type StorageOffers = {
  offers: Offers;
  changeOffers: Offers;
};

export type StorageReviews = {
  reviews: ReviewsList;
};
