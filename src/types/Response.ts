export type Offer = {
bedrooms: number;
city: {
location: {
latitude: number;
longitude: number;
zoom: number;
};
name: string;
};
description: string;
goods: string[];
host: {
avatarUrl: string;
id: number;
isPro: boolean;
name: string;
};
id: number;
images: string[];
isFavorite: boolean;
isPremium: boolean;
location: {
latitude: number;
longitude: number;
zoom: number;
};
maxAdults: number;
previewImage: string;
price: number;
rating: number;
title: string;
type: string;
};

export type Offers = Offer[];

export type Review = {
    comment: string;
    date: string;
    id: number;
    rating: number;
    user: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
    };
  };

export type ReviewsList = Review[];

export type DataAuthorization = {
  avatarUrl: string;
  email: string;
  id: number;
  isPro: boolean;
  name: string;
  token: string;
  };

export type Error = {
    error: string;
    };

export type UserData = {
        email: string;
        password: string;
    };

export type ValueStatus = {
        hotelId: number;
        status: boolean;
    };
